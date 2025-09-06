function generateModule(moduleName) {
    const { execSync } = require('child_process');

    // Generate module, controller, and service using Nest CLI
    execSync(`nest generate module ${moduleName}/${moduleName}`);
    execSync(`nest generate controller ${moduleName} --no-spec`);
    execSync(`nest generate service ${moduleName} --no-spec`);

    console.log(`Module ${moduleName} generated successfully.`);
}

const moduleName = process.argv[2];
if (!moduleName) {
    console.error('Please provide a module name.');
    process.exit(1);
}

generateModule(moduleName);