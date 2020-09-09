# Registrar o runner do projeto

1- Execute o seguinte comando:

sudo gitlab-runner register

2- Digite o URL da sua instância do GitLab: Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )

https://gitlab.com

3- Digite o token que você obteve para registrar o Runner: Please enter the gitlab-ci token for this runner

Observação: Este token está no Gitlab->Projeto->Settings->CI/CD->Runners

4- Digite uma descrição para o Runner, você poderá alterar isso posteriormente na interface do usuário do GitLab: Please enter the gitlab-ci description for this runner

Nome do projeto

5- Digite as tags associadas ao Runner . Você pode alterar isso posteriormente na interface do usuário do GitLab: Please enter the gitlab-ci tags for this runner (comma separated):

Enter

Digite o executor do Runner: Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell:

Shell
