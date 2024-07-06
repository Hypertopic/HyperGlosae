# Testing and developping Hyperglosae frontend

## Install dependencies

```
npm install
```

## Run in development mode

```
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you update code in `src`.\
You may also see any lint errors in the console.

The frontend is coded in JavaScript with the React framework (see [documentation](https://reactjs.org/docs/getting-started.html)).

### Install test tools

Get the name of your shell (`bash`, `zsh`, etc.):

```shell
ps
```

Depending on your shell, add this function to `~/.bashrc`, `~/.zshrc`, or other:

```shell
function cucumber() {
  (docker run --rm -v "$(pwd)":/app --tty --net="host" --env APP_HOST="http://host.docker.internal:3000" benel/cucumber-capybara "$@")
}
```

Start a new terminal and test the following command:

```shell
cucumber --help
```

### Run tests

From the main folder of Hyperglosae, type the following command:

```shell
cucumber --fail-fast --quiet
```

