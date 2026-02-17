# 🚀 Instrucciones de Deploy - PonchEO

**Propósito:** Desplegar PonchEO (Backend + Frontend) a Vercel con Supabase.

**Requisitos previos:**
- Node.js 18+ instalado
- Git instalado
- Cuenta en Vercel (https://vercel.com)
- Acceso al repositorio GitHub
- Supabase project ya creado y con DATABASE_URL

---

## 📋 DATOS NECESARIOS

Antes de empezar, recopila estos datos:

```
DATABASE_URL = postgresql://postgres:ZIX48iquKwui2gz5@db.uxelmnjeykgfzbzwivzj.supabase.co:5432/postgres
JWT_SECRET = MyApp2024Secret!@#
CRON_SECRET = K7mN9pL2qR5sT4vW
```

---

## ⚡ PASO 1: Supabase - Crear extensión uuid-ossp

En Supabase → SQL Editor, ejecuta:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

## 🔧 PASO 2: Clonar repo y preparar entorno local

```bash
# Clonar repo
git clone <tu-repo-url>
cd PonchEO

# Instalar dependencias raíz
npm install

# Crear .env.local en backend
cat > packages/backend/.env.local << 'EOF'
DATABASE_URL="postgresql://postgres:ZIX48iquKwui2gz5@db.uxelmnjeykgfzbzwivzj.supabase.co:5432/postgres"
JWT_SECRET="MyApp2024Secret!@#"
JWT_EXPIRES_IN="24h"
NODE_ENV="development"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
AUTO_CLOSE_CRON="0 2 * * *"
AUTO_CLOSE_THRESHOLD_HOURS=14
CRON_SECRET="K7mN9pL2qR5sT4vW"
EOF

# Crear .env.local en frontend
cat > packages/frontend/.env.local << 'EOF'
VITE_API_BASE_URL="http://localhost:3000/api"
EOF
```

---

## 🗄️ PASO 3: Migraciones y Seed en Supabase

```bash
cd packages/backend

# Instalar deps backend
npm install

# Generar Prisma client
npx prisma generate

# Aplicar migraciones (usa db push si no hay carpeta migrations)
npx prisma db push

# Ejecutar seed
npm run db:seed
```

Si todo OK, verás: `Seed completed successfully!`

---

## 🏗️ PASO 4: Build local (verificación)

```bash
# Backend
cd packages/backend
npm run build

# Frontend
cd ../frontend
npm install
npm run build
```

Si ambos compilaron sin errores → ✅ listo para Vercel.

---

## 🚀 PASO 5: Deploy a Vercel (Opción A — UI)

### Backend

1. Ve a https://vercel.com/new
2. Click **Import Git Repository** → selecciona tu repo
3. Configura:
   - **Root Directory:** `packages/backend`
   - **Framework Preset:** Other
   - **Install Command:** `npm ci`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Environment Variables** y agrega (para Production):
   ```
   DATABASE_URL = postgresql://postgres:ZIX48iquKwui2gz5@db.uxelmnjeykgfzbzwivzj.supabase.co:5432/postgres
   JWT_SECRET = MyApp2024Secret!@#
   JWT_EXPIRES_IN = 24h
   NODE_ENV = production
   CORS_ORIGIN = https://<tu-frontend-url.vercel.app>  (agrega después de crear frontend)
   CRON_SECRET = K7mN9pL2qR5sT4vW
   AUTO_CLOSE_THRESHOLD_HOURS = 14
   ```
5. Click **Deploy**
6. Espera a que termine (3-5 min)
7. Copia la URL: `https://poncheo-backend-xxxxx.vercel.app`

### Frontend

1. Nuevamente https://vercel.com/new
2. Same repo, pero:
   - **Root Directory:** `packages/frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. **Environment Variables** (Production):
   ```
   VITE_API_BASE_URL = https://poncheo-backend-xxxxx.vercel.app/api
   ```
4. **Deploy**
5. Copia URL: `https://poncheo-frontend-xxxxx.vercel.app`

---

## 🚀 PASO 5 (Alternativa B — CLI)

Si prefieres usar terminal:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Loguear en Vercel
vercel login

# Backend
cd packages/backend
vercel link    # elige proyecto o crea uno

# Agregar variables
vercel env add DATABASE_URL production
# Pega: postgresql://postgres:ZIX48iquKwui2gz5@db.uxelmnjeykgfzbzwivzj.supabase.co:5432/postgres

vercel env add JWT_SECRET production
# Pega: MyApp2024Secret!@#

vercel env add JWT_EXPIRES_IN production
# Pega: 24h

vercel env add NODE_ENV production
# Pega: production

vercel env add CRON_SECRET production
# Pega: K7mN9pL2qR5sT4vW

vercel env add AUTO_CLOSE_THRESHOLD_HOURS production
# Pega: 14

# Deploy
vercel --prod
# Copia URL del resultado

# Frontend
cd ../frontend
vercel link

vercel env add VITE_API_BASE_URL production
# Pega: https://poncheo-backend-xxxxx.vercel.app/api

vercel --prod
```

---

## ✅ PASO 6: Verificar Deploy

```bash
# Test health endpoint del backend
curl https://<tu-backend-url>/api/health

# Debe responder:
# {"status":"ok","timestamp":"2026-02-17T..."}
```

- Abre frontend en navegador: `https://<tu-frontend-url>`
- Intenta login con:
  - Email: `supervisor@poncheo.com`
  - Password: `password123`

---

## 🔄 PASO 7: Actualizar CORS_ORIGIN en Backend (después de tener URLs finales)

Si en Paso 5A configuraste CORS_ORIGIN como placeholder, ahora actualiza:

1. Vercel → Backend project → Settings → Environment Variables
2. Edita `CORS_ORIGIN` → `https://<tu-frontend-url.vercel.app>`
3. Click Save → Vercel redeploya automáticamente

---

## 📝 Notas importantes

- **Variables sensibles:** No compartas JWT_SECRET ni DATABASE_URL públicamente. Guarda en un lugar seguro.
- **Migraciones en producción:** Si agregas nuevas tablas/campos a `schema.prisma`:
  ```bash
  npx prisma migrate dev --name <nombre>
  # Envía `prisma/migrations/*` a git
  # En Vercel, el build ejecutará `npx prisma migrate deploy` automáticamente
  ```
- **Seed en producción:** Solo corre `npm run db:seed` en desarrollo. En producción, crea datos manualmente o vía API.
- **Cron Jobs:** Los cron de `vercel.json` (auto-close punches) requieren `CRON_SECRET`. Configúralo en Vercel.

---

## 🆘 Si algo falla

1. **Error de variables:** Verifica que DATABASE_URL, JWT_SECRET, etc. estén en Vercel UI.
2. **Build error:** Revisa Vercel → Deployments → View Build Logs.
3. **Prisma error:** Comprueba que `DATABASE_URL` está correcta y Supabase está accesible.
4. **Frontend no conecta:** Verifica que `VITE_API_BASE_URL` apunta a la URL correcta del backend.

---

## 💾 Archivos importantes

- `packages/backend/.env.local` — credenciales backend (NO envíes a git)
- `packages/frontend/.env.local` — URL API frontend (NO envíes a git)
- `packages/backend/vercel.json` — config de build y crons
- `packages/frontend/vercel.json` — config de rewrite para SPA
- `prisma/schema.prisma` — esquema de BD

---

**¡Listo! Si todo va bien, en 15-30 min tendrás tu app en producción. 🎉**
