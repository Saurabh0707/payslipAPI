# Foobar

Payslip Backend API

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install foobar.

```bash
npm install
```

## Usage

```bash
npm run start
```
####  Input Format

###### Properties

- firstname: Saurabh (string, required) - The unique identifier for a product
- lastname: Verma (string, required) - Name of the product
- annualSalary: 60050 (number, required)
- superRate:  9 (number, required, fixed-range)
- paymentStartDate: 10-28-2019 (Date[MM-DD-YYYY], required)

#### JSON

```json
{
    "firstname": "Saurabh",
    "lastname": "Verma",
    "annualSalary": 60050,
    "superRate": 9,
    "paymentStartDate": 10-28-2019
}
```
# Resource
[Github URL](https://github.com/Saurabh0707/payslipAPI)