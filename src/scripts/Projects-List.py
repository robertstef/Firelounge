import subprocess

# make call to 'firebase projects:list
process = subprocess.Popen(['firebase', 'projects:list'],
                           stdout=subprocess.PIPE,
                           universal_newlines=True)

std_out = process.communicate()[0]

#check for successful
if process.returncode != 0:
    exit -1
else:
    # format object
    std_out = ([i for i in std_out.split('\n') if i])

    projectList = []
    for i in range(3, (len(std_out) - 2), 2):
        project = []
        line = ([i for i in std_out[i].split(' ') if i])
        line = ([i for i in line if i != '│'])

        #if project name not specified
        if line[0] != '\x1b[33m[Not':
            project.append(line[0])
            project.append(line[1])
            #check if resource location id if specified
            if line[2] != '\x1b[33m[Not':
                project.append(line[2])
            else:
                project.append("Not Specified")
        else:
            project.append("Not Specified")
            project.append(line[2])
            # check if resource location id if specified
            if line[3] != '\x1b[33m[Not':
                project.append(line[3])
            else:
                project.append("Not Specified")
        projectList.append(project)

    print(projectList)