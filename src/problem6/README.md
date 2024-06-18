# Problem 6: Architecture

## Endpoint: Create a New Task

### URL: `api/users/{:user_uuid}/action`

### Method: `POST`

### Description:
- to receive the action which allow user to score point.
- need check user complete the action or not to give him a valid score

### Response:
- Success (201 Created) because it should create the action entity and save it to db.
- Client Error (400 Bad Request):
  - If the action is not valid or unfinished.
  - If api call rate exceeds limit, which should be predefined.
- Unauthorized (401 Unauthorized): user is not logged in.

### Related tasks

- If data is valid and user does earn score, increase corresponding score to the total score of that user.
- Compare to the score of 10th user on scoreboard.
  - If the new score is greater than the 10th position score. We should update the score bar. 


## Other requirements
- Depend on the requirement and the size of traffice and user data, The 10th score and whole top ten scoreboard should be store on `redis` or make a naive database query. Prefer using `redis` as soon as posible.
- We can use websocket for real-time scorecard updating.
- Also should implement notification for the change to realted user.
