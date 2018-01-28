# Changelog

## 0.6.0

28 Jan 2018 by [@bhubr](https://github.com/bhubr)

- The `validateArgs` function slices the args it receives. Apparently, doing it on an empty array doesn't work, but calling `Array.prototype.slice` does.

When calling `validateArgs` from `repositories.get`, the order of arguments and the number of expected arguments was swapped.

This release fixes these bugs.

## 0.5.0

23 Oct 2017, by [@kristianmandrup](github.com/kristianmandrup)

First release of newly refactored and extended API, including extensive test coverage.
