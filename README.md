# atdl4js

## Limitations

- `minimum`, `maximum` are not supported for strings with date/time format;
  - ATDL: `minValue`, `maxValue` for `MonthYear_t`, `UTCTimestamp_t`, `UTCTimeOnly_t`, `LocalMktDate_t`, `UTCDateOnly_t` types;
- cannot set date based on timezone;
  - ATDL: `localMktTz` - further qualification of dalilyMinValue, dailyMaxValue and dailyConstValue. Lets the order sending system know the location of the recipient system or target marketplace so it can accurately display time regarless of whether daylight savings is in affect at the recipient site. Example: `localMktTz="America/New_York"`;
- cannot set `default` dynamically;
  - ATDL: `initValueMode` - defines the treatment of initValue time. 0: use initValue; 1: use current time if initValue time has past;
- increment policies not clear;
  - ATDL: `incrementPolicy` or `innerIncrementPolicy` - Describes how to use innerIncrement. If undefined then take value from innerIncrement attribute, if LotSize use value based on symbol lot size. (If lot size is not available use value of innerIncrement attribute.) If Tick use value based on symbol tick size. (If tick size is not available use value of innerIncrement attribute.) If innerIncrement is to be used and is not defined then use a system default value.

## TODO:

- Strategy selection. The idea: form element outside of strategies?
- Global validation on submission only. The idea: reuse the same rule engine and run rules based on provided data. The special "message" event could be added to gather validation errors.
- Collapsible panel.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm build`

Builds the app for production to the `build` folder.\
