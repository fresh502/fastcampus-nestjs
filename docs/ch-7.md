# chapter-7

## Postgres

```sql
-- 테이블 정보 확인
\d+ "user"

-- 쿼리 분석
explain analyze select * from "user" where email = 'nestjs@fastcampus.com';
```

## Migration 관련

- 패키지 설치

```bash
$ npm i -g ts-node
```

- package.json - script에 추가

```json
"typeorm": "ts-node -r ./node_modules/tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/ormconfig.ts"
```

- 실행 명령어

```bash
$ npm run typeorm migration:generate src/migrations/Init
$ npm run typeorm migration:run
```
