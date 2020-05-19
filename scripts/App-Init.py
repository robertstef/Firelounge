# Initializes the application after the user logs into firebase

import os
import subprocess


def get_user_filename():
    """
    Obtains the filename for the current user logged into firebase.
    :return: the users username (in form of email_address.json)
    """
    # run login command to get username
    output = subprocess.run(["firebase", "login", "--interactive"], stdout=subprocess.PIPE, universal_newlines=True)

    # extract username from output
    output = ([i for i in output.stdout.split('\n') if i][-1])
    output = ([i for i in output.split(' ') if i][-1])
    output = output.split("@")[0][4:]
    output = output + ".json"

    return output


if __name__ == '__main__':

    home = os.path.expanduser("~/.firelounge/Users")
    ufile = get_user_filename()
    path = os.path.join(home, ufile)

    # first time firelounge user
    if not os.path.isfile(path):
        with open(path, 'w') as fn:
            pass

