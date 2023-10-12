from random import randint
from datetime import date, timedelta, datetime


def askingDateNTime():
    day = date.today().strftime("%A")
    month = date.today().strftime("%B")
    theDate = date.today().strftime("%d")
    year = date.today().strftime("%Y")
    time = datetime.now().strftime("%I:%M%p")
    res_list = [
        f"Welcome to {day}, {month} {theDate}, {year} - {time}.",
        f"Greetings it is {day}, {month} {theDate}, {year} - {time}.",
        f"Welcome to {day}, {month} {theDate}, {year} - {time}.",
        f"Today is {day}, {month} {theDate}, {year} - {time}.",
        f"It's {day}, {month} {theDate}, {year} - {time}."
    ]
    
    return res_list[randint(0,(len(res_list)-1))]

def yesterday():
    day = (date.today() - timedelta(days=1)).strftime("%A")
    month = (date.today() - timedelta(days=1)).strftime("%B")
    theDate = (date.today() - timedelta(days=1)).strftime("%d")
    year = (date.today() - timedelta(days=1)).strftime("%Y")
    res_list = [
        f"Yesterday is {day}, {month} {theDate}, {year}.",
        f"Welcome! yesterday is {day}, {month} {theDate}, {year}.",
        f"Greetings! yesterday is {day}, {month} {theDate}, {year}.",
        f"{day}, {month} {theDate}, {year} is the date yesterday.",
        f"It's {day}, {month} {theDate}, {year} yesterday."
    ]
    
    return res_list[randint(0,(len(res_list)-1))]