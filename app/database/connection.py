from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# 📁 Caminho até a raiz do projeto
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# 📄 Caminho do arquivo .env
env_path = os.path.join(BASE_DIR, ".env")

# 🔐 Carrega o .env corretamente
load_dotenv(dotenv_path=env_path)

# 📥 Variáveis de ambiente
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

# 🧪 DEBUG (pode remover depois)
print("DEBUG ENV:")
print("DB_HOST =", DB_HOST)
print("DB_USER =", DB_USER)
print("DB_NAME =", DB_NAME)

# 🔗 String de conexão
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# ⚙️ Engine do banco
engine = create_engine(DATABASE_URL)

# 🧵 Sessão do banco
SessionLocal = sessionmaker(bind=engine)