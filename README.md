# 🎁 Baby Shower Gift Selector

Un selector inteligente de regalos para baby shower con pañales por etapa y sistema de reservas en tiempo real.

## ✨ Características

- 🎯 **50 regalos únicos** organizados por etapa del bebé
- 📦 **Pañales incluidos** en cada regalo (RN → P → M → G → Pull-ups)
- 🔒 **Sistema de reservas** para evitar duplicados
- 📱 **Responsive design** optimizado para móviles
- 💾 **Persistencia local** con localStorage
- 🔍 **Búsqueda avanzada** por categoría, marca o producto
- 📊 **Dashboard de progreso** con estadísticas en tiempo real
- 📱 **Compartir por WhatsApp** el resumen de reservas

## 🚀 Tecnologías

- **Next.js 14** - Framework React de producción
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Lucide React** - Iconos modernos
- **LocalStorage** - Persistencia de datos

## 📱 Estructura de Regalos

### 👶 Recién Nacido (0-3 meses) + Pañales RN
- Bodies, pijamas, mantas térmicas
- Kit de aseo básico
- Accesorios para recién nacido

### 🌟 Primeros Meses (3-6 meses) + Pañales P
- Ropa talla P
- Baberos y mordederas
- Kit de alimentación

### 🚀 Más Activo (6-9 meses) + Pañales M
- Ropa talla M
- Juguetes sensoriales
- Zapatos primeros pasos

### 🎯 Explorando (9-12 meses) + Pañales G
- Ropa talla G
- Juguetes educativos
- Vajilla para bebé

### 🌈 Primera Infancia (12+ meses) + Pull-ups
- Ropa talla 12M+
- Juguetes de desarrollo
- Instrumentos musicales

### 💎 Regalos Especiales
- Monitor para bebé
- Esterilizador eléctrico
- Humidificador
- Y más...

## 🛠️ Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-repositorio>
   cd baby-shower-gift-selector
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📋 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start

# Linting
npm run lint

# Verificación de tipos
npm run type-check
```

## 🔧 Configuración

### Variables de Entorno
No se requieren variables de entorno. Todos los datos se almacenan localmente.

### Personalización
- Modifica la lista de regalos en `src/app/page.tsx`
- Ajusta los estilos en `src/app/globals.css`
- Configura Tailwind en `tailwind.config.ts`

## 📊 Funcionalidades

### Sistema de Reservas
- ✅ Reserva instantánea con nombre y teléfono
- 🔒 Bloqueo automático de regalos reservados
- ❌ Cancelación de reservas
- 🔄 Reset completo del sistema

### Búsqueda y Filtros
- 🔍 Búsqueda por texto libre
- 🎯 Filtro por disponibilidad
- 📂 Organización por categorías
- 📊 Vista de estadísticas

### Persistencia de Datos
- 💾 Guardado automático en localStorage
- 🔄 Sincronización en tiempo real
- 📱 Funciona sin conexión

## 🛒 Tiendas Recomendadas

Todos los productos están disponibles en:
- **Falabella Colombia**
- **Almacenes Éxito**

## 📱 Responsive Design

- 📱 **Móvil**: Optimizado para touch
- 💻 **Desktop**: Interfaz completa
- 📟 **Tablet**: Experiencia híbrida

## 🔒 Validaciones

- ✅ Números de teléfono colombianos (formato: 3XX XXX XXXX)
- ✅ Nombres obligatorios
- ✅ Prevención de duplicados
- ✅ Sanitización de entradas

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
# Conectar con GitHub y deploy automático
```

### Otros Providers
```bash
npm run build
# Subir carpeta .next y archivos estáticos
```

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

MIT License - ver archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

- 📧 Email: support@baby-shower-selector.com
- 💬 WhatsApp: +57 XXX XXX XXXX
- 🐛 Issues: GitHub Issues

## 🙏 Créditos

- **Íconos**: [Lucide React](https://lucide.dev/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Fuentes**: [Inter Font](https://rsms.me/inter/)

---

**¡Hecho con ❤️ para hacer más fácil la organización de Baby Showers!**