# chapter-6

## Postgres

```sql
-- 테이블 정보 확인
\d+ "user"

-- 쿼리 분석
explain analyze select * from "user" where email = 'nestjs@fastcampus.com';
```
