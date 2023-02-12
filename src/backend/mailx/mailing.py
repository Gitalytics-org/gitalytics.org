#!/usr/bin/python3
# -*- coding=utf-8 -*-
r"""

"""
import smtplib
from email.message import EmailMessage
import pydantic


TARGET = ""


class MailSettings(pydantic.BaseSettings):
    NOREPLY_EMAIL: str
    NOREPLY_PASSWORD: str
    NOREPLY_APP_PASSWORD: str

    class Config:
        env_file = "../.env"


settings = MailSettings()

msg = EmailMessage()
msg['Subject'] = 'Gitalytics Subject for the mail sent by Python code'
msg['From'] = settings.NOREPLY_EMAIL
msg['To'] = TARGET
msg.set_content('Gitalytics Content of the mail sent by Python code')

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
    smtp.login(settings.NOREPLY_EMAIL, settings.NOREPLY_APP_PASSWORD)
    smtp.send_message(msg)
