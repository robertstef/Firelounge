# Install script to be run when app is installed on users machine

import os


def create_dirs(home_path):
    """
    Creates the files .firelounge and .firelounge/Users
    in the users home directory.

    :param home_path: absolute path to users home directory
    :return: True on success, False on failure
    """
    # create .firelounge and Users folder in root directory
    try:
        os.makedirs(f'{home}/.firelounge/Users')
        return True

    # find something better to do with this error
    except OSError:
        print("Directories already exist")
        return False


if __name__ == '__main__':

    # get path to users home directory
    home = os.path.expanduser("~")
    if create_dirs(home):
        print("Install directories successfully created")
    else:
        print("Unable to create install directories")

# eof
