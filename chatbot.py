from wit import Wit
from datetime import date, timedelta, datetime
import response_list
import sys


client = Wit("43CYXUQIGD5HIDP4IYCP537BWSMV2XO6")

inpt = " ".join(sys.argv[1:])

print("   ")

resp = client.message(inpt)


try:
    intent = resp["intents"][0]["name"]
    
    if intent == "askingDate":
        when = resp['entities']['whenDate:whenDate'][0]["value"]
        if when == "today":
            print(response_list.askingDateNTime())
        elif when == "tomorrow":
            print("The date tomorrow is",(date.today() + timedelta(days=1)).strftime("%B %d, %Y"))
        elif when == "yesterday":
            print(response_list.yesterday())
    
    if intent == "askingTime":
        print(response_list.askingDateNTime())
        
        
except:
    print("Sorry I do not understand what you are saying, Please ask another question.")
print("   ")



