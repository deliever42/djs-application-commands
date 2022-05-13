export function ApplyMixins(targetClass: Function, constructors: Function[]) {
    constructors.forEach(constructors => {
        Object.getOwnPropertyNames(constructors.prototype).forEach(name => {
            if (name !== 'constructor') {
                targetClass.prototype[name] = constructors.prototype[name];
            }
        });
    });
    return
}