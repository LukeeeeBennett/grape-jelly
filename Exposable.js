class Exposable {
  constructor(key, options = {}, evaluationFunction) {
    this.key = key;
    this.options = options;
    this.evaluationFunction = evaluationFunction || this.defaultEvaluationFunction;

    this.exposedKey = options.as || key;    
  }
  
  represent(data, options) {
    return { key: this.exposedKey, value: this.evaluationFunction(data, options) };
  }
  
  defaultEvaluationFunction(data) {
    return data[this.key];
  }
}
