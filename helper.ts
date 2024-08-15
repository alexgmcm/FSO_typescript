export const parseNumericalArguments = (args: string[], expectedNArgs: number): number[] => {
    if (expectedNArgs!= -1) {
        // Use -1 to code for infinite possible args
    if (args.length < expectedNArgs) throw new Error('Not enough arguments');
    if (args.length > expectedNArgs) throw new Error('Too many arguments');
    }

    let returnArgs: number[] = [];
    args.forEach((arg) => {
        if (!isNaN(Number(arg))){
            returnArgs.push(Number(arg))
        } else {
            throw new Error('Provided values were not numbers!');
        }
    })
    
    return returnArgs
  }

  