const inquirer = require('inquirer')
const fs = require('fs')
const { execSync } = require('child_process')

console.log('# # #    # # #    # # #     # # #    # # #    # # #')
console.log('######  #######  #######   #######  #######  ######')
console.log('###################################################')
console.log('##                                               ##')
console.log('##  NODE.JS TEMPLATE BUILDER - JEFFERSON DANTAS  ##')
console.log('###################################################\n')

inquirer.prompt([
	{
		name: 'name',
		message: 'Nome do projeto:',
		type: 'input'
	},
	{
		name: 'author',
		message: 'Autor do projeto:',
		type: 'input'
	},
	{
		name: 'description',
		message: 'Descrição do projeto:',
		type: 'input'
	},
	{
		name: 'git',
		message: 'Criar um repositório Git?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'eslint',
		message: 'Usar ESLint?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'public',
		message: 'Usar diretório público?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'sass',
		message: 'Usar SASS?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'gulp',
		message: 'Usar Gulp?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'socketio',
		message: 'Usar Socket.IO?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'ejs',
		message: 'Usar EJS?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'env',
		message: 'Usar .env?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
	{
		name: 'yarn',
		message: 'Usar Yarn?',
		type: 'list',
		choices: ['Sim', 'Não']
	},
]).then((answers) => {

	console.log('┏━━━━━━━━━━━━━━━━┓')
	console.log('┃ 1/7 Preparando ┃')
	console.log('┗━━━━━━━━━━━━━━━━┛')


	// Organiza as respostas em booleano
	for (const answer in answers) {
		answers[answer] = (answers[answer] == 'Sim' ? true : answers[answer] == 'Não' ? false : answers[answer])
	}

	if (!answers.public) {
		answers.sass = false
		answers.gulp = false
	}

	// Remove o ".git"
	if (fs.existsSync('.git')) fs.rmdirSync('.git')

	// Remove o "README.md"
	if (fs.existsSync('README.md')) fs.unlinkSync('README.md')

	// Inicia o Git
	if (answers.git) execSync('git init', { stdio: [0, 1, 2] })


	console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━┓')
	console.log('┃ 2/7 Instalando pacotes ┃')
	console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━┛')


	const npmPackages = ['express']
	const npmDevPackages = []
	if (answers.socketio) npmPackages.push('socket.io')
	if (answers.env) npmPackages.push('dotenv')
	if (answers.ejs) npmPackages.push('ejs')
	if (answers.gulp) npmDevPackages.push('gulp', 'gulp-clean', 'gulp-htmlmin', 'gulp-jsonminify', 'gulp-clean-css', 'gulp-uglify-es', 'cross-env')
	if (answers.sass) npmDevPackages.push('sass')
	if (npmPackages.length) execSync((answers.yarn ? 'yarn add ' : 'npm install ') + npmPackages.join(' '), { stdio: [0, 1, 2] })
	if (npmDevPackages.length) execSync((answers.yarn ? 'yarn add -D ' : 'npm install --save-dev ') + npmDevPackages.join(' '), { stdio: [0, 1, 2] })


	console.log('┏━━━━━━━━━━━━━━━━━━━━━━┓')
	console.log('┃ 3/7 Criando index.js ┃')
	console.log('┗━━━━━━━━━━━━━━━━━━━━━━┛')


	const indexjs = `${answers.env ? 'require(\'dotenv/config\')\n' : ''}const express = require('express')
const app = express()
${answers.socketio ? `const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
	console.log('Usuário conectado:', socket.id)

	socket.on('disconnect', () => {
		console.log('Usuário desconectado:', socket.id)
	})
})\n` : ''}
${answers.ejs ? 'app.set(\'view engine\', \'ejs\')\n' : ''}app.use(express.json())
app.use(express.urlencoded({ extended: true }))
${answers.public ? `app.use(express.static(${answers.gulp ? 'process.env.NODE_ENV === \'production\' ? \'dist\' : \'src\'' : '\'src\''}))\n` : ''}
app.get('/', (req, res) => {
	${answers.ejs ? 'res.render(\'index\', { message: \'Hello World\' })' : 'res.send(\'Hello World\')'}
})

${answers.socketio ? 'server' : 'app'}.listen(process.env.PORT || 3000, () => {
	console.log('> Servidor iniciado na porta ' + (process.env.PORT || 3000))
})`

	fs.writeFileSync('index.js', indexjs)


	console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
	console.log('┃ 4/7 Criando manifest.json ┃')
	console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')


	const manifestJSON = JSON.parse(fs.readFileSync('src/manifest.json', { encoding: 'UTF-8' }))
	manifestJSON.name = answers.name || 'Website'
	manifestJSON.short_name = answers.name || 'Website'
	manifestJSON.description = answers.description
	fs.writeFileSync('src/manifest.json', JSON.stringify(manifestJSON, null, '\t'))


	console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
	console.log('┃ 5/7 Excluindo arquivos desnecessários ┃')
	console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')


	// Exclui o arquivo ".eslintrc.json" se não usar ESLint
	if (!answers.eslint) fs.unlinkSync('.eslintrc.json')

	// Exclui o diretório "src/scss" se não for usar SASS
	if (!answers.sass) fs.rmdirSync('src/scss', { recursive: true, force: true })

	// Exclui o arquivo "src/index.html" se usar EJS
	if (answers.ejs) fs.unlinkSync('src/index.html')

	// Exclui o diretório "src" se não usar público
	if (!answers.public) fs.rmdirSync('src', { recursive: true, force: true })

	// Exclui o diretório "views" se não usar EJS
	if (!answers.ejs) fs.rmdirSync('views', { recursive: true, force: true })

	// Exclui o "package-lock.json" se for usar Yarn
	if (answers.yarn) fs.unlinkSync('package-lock.json')

	// Exclui o "gulpfile.js" se não for usar Gulp
	if (!answers.gulp) fs.unlinkSync('gulpfile.js')

	// Cria o arquivo ".env" se for usar
	if (answers.env) fs.writeFileSync('.env', '')


	console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
	console.log('┃ 6/7 Criando package.json ┃')
	console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛')


	const packageJSON = JSON.parse(fs.readFileSync('package.json', { encoding: 'UTF-8' }))
	packageJSON.name = answers.name.replace(/ /g, '-').toLowerCase()
	packageJSON.author = answers.author
	packageJSON.description = answers.description
	if (answers.gulp) packageJSON.scripts.start = 'npx cross-env NODE_ENV=production node index.js'
	const buildScripts = []
	if (answers.sass) buildScripts.push('npx sass src/scss:src/css --no-source-map --style compressed')
	if (answers.gulp) buildScripts.push('npx gulp')
	if (buildScripts.length) packageJSON.scripts.build = buildScripts.join(' && ')
	fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, '  '))


	console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓')
	console.log('┃ 7/7 Removendo pacotes do instalador ┃')
	console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛')


	execSync((answers.yarn ? 'yarn remove ' : 'npm uninstall ') + 'inquirer', { stdio: [0, 1, 2] })
	fs.unlinkSync('install.js')

	console.log('')
	console.log('+--------------------------------------+')
	console.log('|   Instalação concluída com sucesso   |')
	console.log('+--------------------------------------+')

}).catch((err) => {
	// Erro na instalação
	console.error(err)
	console.log('')
	console.log('+-------------------------------------+')
	console.log('|         Falha na instalação         |')
	console.log('+-------------------------------------+')
})