# FSLABScli Github Action

* [Usage](#usage)
  * [Workflow](#workflow)
* [License](#license)

## Usage

Install FSLABScli for GitHub Action

**Options**

`version`: Specify the FSLABScli version to install. Accepted values are any valid releases such as v0.25.0

### Workflow

```yaml
name: fslabsci

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'
    
permissions:
  contents: write
  pull-requests: write

jobs:
  fslabscli:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install FSLABScli in the runner
        uses: ForesightMiningSoftwareCorporation/fslabscli@v1

      - name: Regenerate release workflow
        run: fslabscli generate-release-workflow --output .github/workflows/release.yml --template ../.github/workflows/release_template.yml
```
## License

MIT. See `LICENSE` for more details.

