
from . import *

router = APIRouter()

# Secure for https required
HTTP_SECURE = False

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def register_user(
    user: schemas.UserCreate, 
    session: Session = Depends(depends.get_db_session)):

    return depends.create_user(user, session)


@router.post("/login")
async def login_for_access_token(
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(depends.get_db_session)
):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if user is None or not depends.verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = depends.create_access_token(user.username)
    refresh_token = depends.create_refresh_token(user.username)

    response.set_cookie('access_token', access_token, depends.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
                        depends.ACCESS_TOKEN_EXPIRE_MINUTES * 60, '/', None, HTTP_SECURE, 
                        True, 'strict')
    response.set_cookie('refresh_token', refresh_token, depends.REFRESH_TOKEN_EXPIRE_MINUTES * 60, 
                        depends.REFRESH_TOKEN_EXPIRE_MINUTES * 60, '/', None, HTTP_SECURE, 
                        True, 'strict')
    
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer", "is_admin": user.is_admin}


@router.post("/logout")
async def logout(response: Response):   
    response.delete_cookie('access_token', '/', None, HTTP_SECURE, True, 'strict')
    response.delete_cookie('refresh_token', '/', None, HTTP_SECURE, True, 'strict')
    
    return 