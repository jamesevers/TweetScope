from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import time

access_token = '836432860890468354-tPluyK4PLxnWkCosLrkURvSPM5amL1L'
access_token_secret = '3XlCPZrq1OlqJCwYM0HLIHLMNeK2G4pt7pBF90CUWiY3k'
consumer_key =  'ZY8hGC1L3GFZQCr37FojnUQMs'
consumer_secret = 'NTqgbXWU1FvtNq8dZtkALDcBaLFdc1l3mnqRF5T13mQ23griCC'


class StdOutListener(StreamListener):
    def __init__(self):
        self.start_time = time.time()
        self.limit = 30

    def on_data(self, data):
        if (time.time() - self.start_time) < self.limit:
            tweets_file = open('tweets_interval.json', 'a')
            tweets_file.write(data)
            tweets_file.write('\n')
            tweets_file.close()
            return True
        else:
            return False

    def on_error(self, status):
        print status


if __name__ == '__main__':
    while True:
    # while (time.localtime().tm_hour > 12) or (time.localtime().tm_hour < 7):
        local_time = time.localtime()
        runtime = 30
        print 'scraping at %s:%s' %(local_time.tm_hour, local_time.tm_min)
        listener = StdOutListener()
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        stream = Stream(auth, listener)
        ##filter lat lon coordinates between san diego, ca and bangor, me
        stream.filter(locations=[-117.1611, 32.7157, -68.7778, 44.8 ])
        print 'sleeping at %s:%s' %(local_time.tm_hour, local_time.tm_min)
        time.sleep(800)
        stream.disconnect()
