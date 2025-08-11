# Calculadora de Cambio de Divisas

![Design preview](./public/screenshot.jpg)

Aplicación web para calcular el cambio entre monedas en tiempo real, basada en el diseño provisto en Figma y consumiendo la API pública de [VATComply](https://api.vatcomply.com/docs).

## Vista previa

[App desplegada en Vercel](https://app-cambio-virid.vercel.app/)

## Challenge

Se requiere desarrollar una calculadora de cambio de divisas en React.

**Diseño**: [Figma Link](https://www.figma.com/design/8LKA0727kw0xWmgPurP1jR/Exchange-challenge)  
**API**: [VATComply](https://api.vatcomply.com/docs)

**Precondiciones**:

- Monto inicial: `1.00`
- Conversión inicial: USD → EUR
- No se aceptan montos negativos
- Conversión automática al modificar el valor
- Botón para intercambiar monedas

---

## Índice

- [Propósito del proyecto](#propósito-del-proyecto)
- [Arquitectura y organización](#arquitectura-y-organización)
- [Decisiones técnicas y buenas prácticas](#decisiones-técnicas-y-buenas-prácticas)
- [Comentarios y notas técnicas destacadas](#comentarios-y-notas-técnicas-destacadas)
- [Herramientas y configuraciones de soporte](#herramientas-y-configuraciones-de-soporte)
- [Variables de entorno](#variables-de-entorno)
- [Integración CI/CD](#integración-ci-cd)
- [Convenciones usadas en el proyecto](#convenciones)
- [Enfoque en accesibilidad](#enfoque-en-accesibilidad)
- [Instrucciones para correr localmente](#instrucciones-para-correr-localmente)
- [Qué se podría mejorar o agregar](#qué-se-podría-mejorar-o-agregar)
- [Conclusión](#conclusión)

---

## Propósito del proyecto <a name="propósito-del-proyecto"></a>

Este proyecto busca ser un ejemplo real y profesional de una aplicación web sencilla pero robusta.  
El foco estuvo en lograr código legible, escalable y con buenas prácticas y convenciones modernas.

Se respetó el diseño original de Figma, adaptándolo con medidas propias de Tailwind CSS para evitar valores hardcodeados y garantizar consistencia y mantenibilidad.  
Las funcionalidades se definieron y documentaron basándose en el diseño y la experiencia de usuario para asegurar claridad y fidelidad.

[⬆ Volver al índice](#índice)

---

## Arquitectura y organización <a name="arquitectura-y-organización"></a>

- **Componentización clara:** la UI está dividida en componentes con responsabilidad única, facilitando mantenimiento, pruebas y posibles extensiones.
- **Hooks personalizados:** separamos lógica de negocio y presentación usando hooks para manejo de estado y gestión de datos.
- **Tipos y validación:** TypeScript y Zod garantizan tipado estricto y validación externa, evitando errores y mejorando la experiencia de desarrollo.
- **Variables de entorno:** URLs y configuraciones flexibles para adaptarse a distintos entornos sin modificar código.
- **Control de estado y carga:** estados de carga y error manejados explícitamente, con mensajes claros y opciones de recuperación.

[⬆ Volver al índice](#índice)

---

## Decisiones técnicas y buenas prácticas <a name="decisiones-técnicas-y-buenas-prácticas"></a>

### Caché y optimización de datos

- React Query minimiza llamadas innecesarias a la API para optimizar rendimiento.
- Prefetching anticipado de tasas de conversión mejora la experiencia al reducir esperas.

### Validación y manejo de inputs

- El componente `AmountInput` valida manualmente para aceptar solo números positivos, normalizando puntos y comas, limpiando caracteres inválidos, y preservando decimales incompletos para mejor UX.
- Esto asegura que solo datos válidos ingresen al flujo y evita problemas de localización.

### Accesibilidad (a11y)

- Roles y atributos ARIA (`aria-label`, `aria-live`, `aria-invalid`, `aria-describedby`) mejoran la compatibilidad con tecnologías asistivas y navegación por teclado.
- Mensajes accesibles para estados de carga, error e información adicional.
- Estructura semántica clara en la UI.

### Diseño y estilo

- Tailwind CSS agilizó el desarrollo minimizando personalizaciones y usando principalmente clases predefinidas.
- Se creó un theme puntual para casos específicos, siempre priorizando estilos estándar para facilitar mantenimiento y escalabilidad.
- Se buscó preservar la esencia visual del diseño Figma, manteniendo flexibilidad para ajustes responsivos y futuros cambios.

### Calidad y testing

- Tests unitarios enfocados en la lógica de negocio garantizan que el código cumple requisitos funcionales.
- Se inició configuración básica para tests E2E con Playwright, pendiente de completar.
- GitHub Actions valida lint, type check, tests y build antes de merges a main, asegurando estabilidad en producción.

### Feedback y comunicación con usuario

- `Toast` muestra errores y permite reintentos de forma clara y accesible.
- Tooltips aportan transparencia sobre las fuentes de datos y limitaciones.

[⬆ Volver al índice](#índice)

---

## Comentarios y notas técnicas destacadas <a name="comentarios-y-notas-técnicas-destacadas"></a>

- `AmountInput` usa `input type="text"` para mejor control de formato y compatibilidad, con teclado numérico en móviles (`inputMode="decimal"`).
- La entrada se normaliza manualmente para preservar decimales y eliminar ceros a la izquierda.
- El control de error es visual y accesible, con mensajes vinculados al input.
- `ConversionInfo` usa `useRef` para almacenar la última fecha de actualización y evitar rerenders innecesarios.
- Iconos SVG se implementan como componentes reutilizables con props para personalización.
- `CurrencyInput` deshabilita el select si no hay opciones o está cargando, con mensajes accesibles para esos casos.
- El botón de intercambio incluye un icono SVG y es accesible con `aria-label`.
- Los mensajes en `Result` tienen animaciones y roles para comunicar cambios a tecnologías asistivas.

[⬆ Volver al índice](#índice)

---

## Herramientas y configuraciones de soporte <a name="herramientas-y-configuraciones-de-soporte"></a>

- **ESLint:** análisis estático para mantener calidad y estilo consistente.
- **Prettier:** formateo automático y uniforme.
- **TypeScript:** tipado estricto para prevenir errores.
- **React Query:** manejo avanzado de datos remotos con caché y estados.
- **Playwright:** pruebas end-to-end confiables.
- **GitHub Actions:** pipeline CI para validar código y asegurar despliegues estables.
- **Tailwind CSS:** framework CSS para diseño rápido y responsive.

[⬆ Volver al índice](#índice)

---

## Variables de entorno <a name="variables-de-entorno"></a>

- `VITE_API_BASE_URL`: URL base para llamadas a la API de conversión (VATComply).
- `VITE_ENV`: entorno de desarrollo o producción.
- `VITE_CURRENCY_URL`: URL referencial para consulta de monedas.

Estas variables permiten configurar el proyecto para distintos entornos sin modificar código.

[⬆ Volver al índice](#índice)

---

## Integración CI/CD <a name="integración-ci-cd"></a>

- GitHub Actions ejecuta automáticamente lint, tests y build en cada push o pull request.
- Deploy automático en Vercel al mergear a main.
- Esto asegura código validado y sitio siempre disponible.

[⬆ Volver al índice](#índice)

---

## Convenciones usadas en el proyecto <a name="convenciones"></a>

#### 1. Nomenclatura general

- **Archivos y carpetas:**
  - Nombres en **kebab-case** para archivos y carpetas generales (ej. `test-utils.ts`, `public/`).
  - Para componentes y hooks:
    - Componentes en **PascalCase** (ej. `AmountInput.tsx`).
    - Hooks personalizados con prefijo `use` y en **camelCase** (ej. `useConversion.ts`).
- **Variables y funciones:**
  - Nombres descriptivos en **camelCase** para legibilidad.
  - Callbacks y eventos con prefijo `on` (ej. `onRetry`, `onSwap`).

#### 2. Estilo y formato del código

- ESLint y Prettier mantienen estilo consistente y evitan errores comunes.
- Código limpio, legible, con indentación y espacios uniformes.

#### 3. Control de versiones y Git

- Mensajes de commit simples y descriptivos, formato:  
  `tipo: descripción corta` (ej. `feat: agregar botón swap`).
- Branches organizados con prefijos claros (ej. `feature/`, `fix/`, `chore/`).
- GitHub Actions valida calidad continua antes de mergear a main.

#### 6. Manejo de errores y mensajes al usuario

- Componentes específicos (`Toast`) muestran errores con opción de reintento.
- Mensajes claros, accesibles y con feedback visual inmediato.
- Manejo centralizado para evitar inconsistencias y superposiciones.

#### 7. Control de calidad y CI/CD

- Pipeline GitHub Actions que corre lint, type check, tests y build en cada push a ramas principales.
- Revisión exitosa obligatoria para merge a main.
- Deploy automático a Vercel tras cada merge, asegurando entrega continua sin interrupciones.

[⬆ Volver al índice](#índice)

---

## Enfoque en accesibilidad <a name="enfoque-en-accesibilidad"></a>

- Roles y atributos ARIA para soporte en lectores de pantalla.
- Tests automáticos con `vitest-axe` garantizan cumplimiento de estándares mínimos.

[⬆ Volver al índice](#índice)

---

## Instrucciones para correr localmente <a name="instrucciones-para-correr-localmente"></a>

```bash
git clone https://github.com/pablomaurig/app-cambio
cd app-cambio
npm install
npm run dev        # correr en modo desarrollo
npm run build      # build para producción
npm run preview    # preview del build
npm run test       # tests unitarios
npm run test:e2e   # tests end-to-end
npm run lint       # chequeo de calidad con eslint
```

---

## Qué se podría mejorar o agregar <a name="qué-se-podría-mejorar-o-agregar"></a>

- Incorporar patrones de diseño si la app crece (ej. estado más complejo, manejo de side effects).
- Mejor documentación de testing y coverage.
- Soporte multilenguaje para internacionalización.
- Mejoras en accesibilidad, como contraste o navegación con teclado extendida.
- Añadir monitoreo y logging para errores en producción.

[⬆ Volver al índice](#índice)

---

## Conclusión <a name="conclusión"></a>

Este proyecto, aunque simple en funcionalidad, se iteró con foco en profesionalismo, escalabilidad y experiencia de usuario. Cada decisión técnica y de diseño tiene un propósito claro, buscando un balance entre fidelidad al diseño, rendimiento, accesibilidad y mantenibilidad.

---
