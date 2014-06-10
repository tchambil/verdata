Verdata
=======

Howto contribute
----------------

1. Fork this repository.

2. Clone the verdata repository.

        git clone git@github.com:yourname/verdata.git
        cd verdata

3. Checkup the development branch.

        git checkout development

4. Init git flow accepting default values.

        git flow init

5. Make some changes in a new feature branch and commit them.

        git flow feature start {feature-name}
        git add {something}
        git commit
        git push

6. When you finish your changes close your feature

        git flow feature finish {feature-name}
        git push

7. Create a pull request in github.
