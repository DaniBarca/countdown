# countdown
A simple web configurable countdown

# Usage
Pass parameters through url, for example:
https://danibarca.com/countdown/?timestamp=2025-04-15T21:46:45.462Z&title=HELLO+WORLD

# Options
* title: set tab title and show it, otherwise tab will be named "Countdown"
* timestamp: timestamp for countdown, you can genrate one with javascript code `JSON.stringify(new Date())`
* day and days: localization for "day" and "days" words

# TODO
* Generate configured url with an easy to use form
* Option to show target-date
