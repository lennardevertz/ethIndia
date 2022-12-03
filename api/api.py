import os
import re
from os.path import exists
from urllib import parse
from flask import Flask
from flask_caching import Cache
from flask_mail import Mail, Message
from twilio.rest import Client

import tweepy
from flask import render_template, request, make_response, redirect
from flask_mail import Message

app = Flask(__name__, static_folder="../public", static_url_path="/")
mail = Mail(app)

account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
client = Client(account_sid, auth_token)

consumer_key_send = os.getenv("TWITTER_API_KEY_SEND")
consumer_secret_send = os.getenv("TWITTER_API_SEC_SEND")
access_token_send = os.getenv("TWITTER_ACC_TOKEN_SEND")
access_token_secret_send = os.getenv("TWITTER_ACC_SEC_SEND")
auth_send = tweepy.OAuthHandler(consumer_key_send, consumer_secret_send)
auth_send.set_access_token(access_token_send, access_token_secret_send)
t_api_send = tweepy.API(auth_send)

def send_mail_flask(to, template, content, subject="Someone just sent you a notification!", **kwargs):
    try:
        msg = Message(subject=subject, sender=(app.config['MAIL_DEFAULT_SENDER'], app.config['MAIL_USERNAME']),
                      recipients=[to])
        msg.body = content
        msg.html = app.send_static_file(template, media=kwargs['url'], content=content, subject=subject)
        mail.send(msg)
        return True
    except Exception as e:
        print(e)
        return False

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


@app.route("/")
def index():
    return app.send_static_file("index.html")
    

@app.route('/api/notify', methods=["POST"])
def send_off_chain_notifications():
    try:
        print(request.get_json())
        data_notification = request.get_json()
        url_media = data_notification['media']
        title = data_notification['title']
        content = data_notification['content']
        identifier_map = data_notification['handles']
        print(url_media, title, content, identifier_map)
        identifier = list(identifier_map.values())
        print(identifier)
        for name in identifier:
            if re.match(r"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$", name):
                send_mail_flask(to=name, content=content, template="mailTemplate.html",
                                subject=title, url=url_media)
            elif re.match(r"^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$", name):
                client.messages.create(
                    body=content,
                    from_='+447700170850',
                    to=name
                )
            elif re.match(r"^@[a-zA-Z0-9_]{1,15}$", name):
                try:
                    clientT = tweepy.Client(os.getenv("BEARER_TOKEN"))
                    twitter_ids_library = clientT.get_user(
                        username=name.replace('@', ''),
                        user_fields=["id"])
                    recipientID = str(twitter_ids_library[0].id)
                except Exception as e:
                    print(str(e))
                    recipientID= "Not found"
                if recipientID != "Not found":
                    try:
                        # sending the direct message
                        dm = t_api_send.send_direct_message(
                            recipient_id=recipientID,
                            text=content,
                            )
                    except Exception as e:
                        print("something wrong error ", str(e))
                        if e.api_errors[0]['code'] == 349:
                            dm = "DMs closed"
                        else:
                            dm = "Something went wrong"
    except Exception as e:
        print(e)
        response = make_response({"message": "Not eligible"}, 400)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
    return {'status': "ok"}
    
    

