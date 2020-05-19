# Initializes the application after the user logs into firebase

import os
import subprocess

home = os.path.expanduser("~/.firelounge/Users")

def get_user():
    """
    Obtains the username for the current user logged into firebase.
    :return: the users username (in form of email address)
    """
    # run login command to get username
    output = subprocess.run(["firebase", "login", "--interactive"], stdout=subprocess.PIPE, universal_newlines=True)

    # extract username from output
    output = ([i for i in output.stdout.split('\n') if i][-1])
    output = ([i for i in output.split(' ') if i][-1])

    return output[4:-5]



if __name__ == '__main__':
    uname = get_user()
