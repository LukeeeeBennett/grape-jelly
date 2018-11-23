class Entity {
  constructor() {
    this.exposables = new Map();
    this.define();
  }

  define() {
    throw new NotImplementedError('define');
  }
  
  represent(data) {
    const serializedObject = {};

    this.exposables.forEach((exposable) => {
      const { key, value } = exposable.represent(data);
      serializedObject[key] = value;
    });
    
    return serializedObject;
  }

  expose(key, ...args) {
    const { options, evaluationFunction } = Entity.getOptionsFromArguments(args);
    const exposable = new Exposable(key, options, evaluationFunction);

    this.exposables.set(key, exposable);
  }

  static getOptionsFromArguments(args) {
    const options = { options: {}, evaluationFunction: undefined };
    const argumentsCount = args.length;
    const lastArgument = args[argumentsCount - 1];
    const secondLastArgument = args[argumentsCount - 2];

    if (isFunction(lastArgument)) options.evaluationFunction = lastArgument;
    if (Entity.isOptionsObject(lastArgument)) options.options = lastArgument;
    if (Entity.isOptionsObject(secondLastArgument)) options.options = options.options || secondLastArgument;

    return options;
  }
  
  static isOptionsObject(object) {
    return !isString(object) && !isFunction(object);
  }
}
