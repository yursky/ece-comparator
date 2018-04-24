<img src="./public/favicon.png" align="left" width="192px" height="192px"/>

# ece-comparator
> Source code for Comparator, a class rating system.

[![Under Development](https://img.shields.io/badge/under-development-orange.svg)](https://github.com/yursky/ece-comparator)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/yursky/ece-comparator)

<br>

Comparator is a system I built in order to help decide which class is the hardest in the ECE curriculum at UT. This is a system that works using pairwise comparisons and ELO. In the background every vote affects the overall ELO of the course using the Glicko2 algorithm. With every vote, we become a little more sure of the subjective difficulty of these courses.

<br>

## Installing 💿

```bash
$ git clone https://github.com/yursky/ece-comparator.git
$ yarn install
$ node app.js
```

## Contributing 👥

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

or if you like it simple:

1. `Fork` this repository
2. Create a `branch`
3. `Commit` your changes
4. `Push` your `commits` to the `branch`
5. Submit a `pull request`

> You can find more information about Pull Requests [here](https://help.github.com/categories/collaborating-on-projects-using-pull-requests/)
