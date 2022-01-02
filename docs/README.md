# charites-docs

This is documentation website for charites. It uses sphinx. Please also see https://www.sphinx-doc.org/en/master/tutorial/getting-started.html.

## Install

```bash
python -m pip install --upgrade pip
pip install pipenv
pipenv install
```

## Build

- for production

```bash
pipenv run build
```

- development

```bash
pipenv run dev
```

open http://127.0.0.1:8000
