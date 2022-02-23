# Variables.

Variables are split into 2 files:
- `_variables.base.scss` - base variables that are used to calculate other
  variables' values.
- `_variables.components.scss` - variables that control the look of components.

These are split into 2 files to allow changing base variables without the
need to provide component variables in custom themes (e.g., to override
primary color in child theme and have it propagate to components).