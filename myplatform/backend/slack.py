import requests

def slack_notify(text=None, channel='#chaeyongmarket'):
    token = 'xoxb-1980601495955-2280194311376-Q77GMDkzOwwgmEZAdF1woMNJ'

    response = requests.post("https://slack.com/api/chat.postMessage",
                             headers={"Authorization": "Bearer " + token},
                             data={"channel": channel, "text": text}
                             )
    return response
