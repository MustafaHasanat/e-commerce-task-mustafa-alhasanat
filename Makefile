dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

test:
	npm test -- --clearCache && npm test

acp:
	git add . && git commit -m "feat: adding features" && git push