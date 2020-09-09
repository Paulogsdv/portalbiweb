# Instalar o runner do projeto

1- sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64

2- sudo chmod +x /usr/local/bin/gitlab-runner

3- sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash

4- sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner

5- sudo gitlab-runner start

6- sudo nano /etc/sudoers

7- gitlab-runner ALL=(ALL) NOPASSWD: ALL

8- sudo usermod -aG docker gitlab-runner

9- sudo gitlab-runner restart
