import subprocess

# call 'firebase login --interactive --reauth'
process = subprocess.Popen(['firebase', 'login', '--interactive', '--reauth'],
                           stdin=subprocess.PIPE,
                           stdout=subprocess.PIPE,
                           universal_newlines=True)
# decline sending crash data
process.stdin.write("n\n")
std_out = process.communicate()[0]
process.stdin.close()

#check for successfull
if process.returncode != 0:
    exit -1
else:
    # find and print username
    username = ([i for i in std_out.split('\n') if i][-1])
    username = ([i for i in username.split(' ') if i][-1])
    print(username)