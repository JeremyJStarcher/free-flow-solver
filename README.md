# free-flow-solver

This will be a solver for the puzzle/game FreeFlow.

Unlike my previous version, written many years ago, this version will use generator functions to step through the possible solutions, rather than relying on the hacky webworkers throwing re-draw event back onto the main thread.

This should resolve the issue of the system getting over-burdened at times and bringing the entire browser down.

