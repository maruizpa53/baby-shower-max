"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { 
  collection, 
  doc, 
  updateDoc, 
  onSnapshot, 
  setDoc,
  getDocs 
} from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Tu archivo de configuración Firebase
import {
  Search,
  Gift,
  Users,
  BarChart3,
  RefreshCw,
  Share2,
  Heart,
  Star,
  Filter,
  X,
  CheckCircle,
  Phone,
  User,
  Info,
  Tag,
} from "lucide-react";

interface Gift {
  id: number;
  category: string;
  gift: string;
  description: string;
  brands: string;
  store: string;
  reserved: boolean;
  reservedBy: string;
  phone: string;
}

export default function BabyShowerGiftSelector() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [showReserved, setShowReserved] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Datos iniciales COMPLETOS de los 42 regalos
  const initialGifts = [
    // ROPA Y ACCESORIOS (11 items)
    {
      id: 1,
      category: "ROPA Y ACCESORIOS",
      gift: "Bodies (0-3 meses) + Pañales Etapa 0",
      description: "Bodies de algodón orgánico con broches (6 pack) + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Arrurrú + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 2,
      category: "ROPA Y ACCESORIOS",
      gift: "Esqueletos (0-3 meses) + Pañales Etapa 0",
      description: "Esqueletos sin mangas talla RN (4 pack) + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Carter's + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 3,
      category: "ROPA Y ACCESORIOS",
      gift: "Pijamas (3-6 meses) + Pañales Etapa 1",
      description: "Pijamas enterizas con cremallera talla P + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 4,
      category: "ROPA Y ACCESORIOS",
      gift: "Bodies (6-9 meses) + Pañales Etapa 2",
      description: "Bodies manga larga talla M (6 pack) + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Carter's + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 5,
      category: "ROPA Y ACCESORIOS",
      gift: "Pijamas (9-12 meses) + Pañales Etapa 3",
      description: "Pijamas dos piezas talla G + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Arrurrú + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 6,
      category: "ROPA Y ACCESORIOS",
      gift: "Conjunto (12-18 meses) + Pañales Etapa 4",
      description: "Conjunto camiseta y pantalón talla 12M + Pañales Winny Etapa 4 (10-16kg)",
      brands: "Carter's + Winny Etapa 4",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 7,
      category: "ROPA Y ACCESORIOS",
      gift: "Calcetines antideslizantes + Pañales Etapa 1",
      description: "Set de calcetines con suela antideslizante + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 8,
      category: "ROPA Y ACCESORIOS",
      gift: "Zapatos primeros pasos + Pañales Etapa 2",
      description: "Zapatos blandos para gatear talla 2-3 + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Bebebé + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 9,
      category: "ROPA Y ACCESORIOS",
      gift: "Zapatos para caminar + Pañales Etapa 3",
      description: "Zapatos con suela flexible talla 4-5 + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Bebebé + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 10,
      category: "ROPA Y ACCESORIOS",
      gift: "Baberos impermeables + Pañales Etapa 1",
      description: "Baberos de silicona con bolsillo (4 pack) + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Gerber + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 11,
      category: "ROPA Y ACCESORIOS",
      gift: "Fajeros y gorritos + Pañales Etapa 0",
      description: "Set de fajeros y gorritos para recién nacido + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Baby Fresh + Winny Etapa 0",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // HIGIENE Y CUIDADO (5 items)
    {
      id: 12,
      category: "HIGIENE Y CUIDADO",
      gift: "Kit higiene completo + Pañales Etapa 0",
      description: "Kit con lima, cortaúñas, cepillo, peine, termómetro + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Safety 1st + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 13,
      category: "HIGIENE Y CUIDADO",
      gift: "Kit cremas para bebé + Pañales Etapa 1",
      description: "Crema anti-rozaduras, loción hidratante, shampoo + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Johnson's Baby + Winny Etapa 1",
      store: "Alkosto / D1 / Ara",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 14,
      category: "HIGIENE Y CUIDADO",
      gift: "Kit cremas Mustela premium + Pañales Etapa 2",
      description: "Kit de cremas especializadas para piel sensible + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Mustela + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 15,
      category: "HIGIENE Y CUIDADO",
      gift: "Toalla con capucha + Pañales Etapa 1",
      description: "Toalla de microfibra con capucha temática animalitos + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 16,
      category: "HIGIENE Y CUIDADO",
      gift: "Toalla de baño grande + Pañales Etapa 2",
      description: "Toalla extra suave para hora del baño + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Carter's + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // DORMITORIO Y DESCANSO (5 items)
    {
      id: 17,
      category: "DORMITORIO Y DESCANSO",
      gift: "Sábanas para cuna + Pañales Etapa 1",
      description: "Juego de sábanas temática animalitos para cuna + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 18,
      category: "DORMITORIO Y DESCANSO",
      gift: "Edredón térmico + Pañales Etapa 2",
      description: "Edredón ligero para todas las estaciones + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Arrurrú + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 19,
      category: "DORMITORIO Y DESCANSO",
      gift: "Toldillo antimosquitos + Pañales Etapa 2",
      description: "Toldillo protector para cuna con fácil instalación + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Baby Fresh + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 20,
      category: "DORMITORIO Y DESCANSO",
      gift: "Esquimal/Manta térmica + Pañales Etapa 0",
      description: "Esquimal de algodón para recién nacido + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Carter's + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 21,
      category: "DORMITORIO Y DESCANSO",
      gift: "Almohada ergonómica + Pañales Etapa 3",
      description: "Almohada especial para bebé + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Chicco + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // ALIMENTACIÓN (6 items)
    {
      id: 22,
      category: "ALIMENTACIÓN",
      gift: "Teteros anticólicos + Pañales Etapa 2",
      description: "Teteros Philips Avent anticólicos + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Philips Avent + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 23,
      category: "ALIMENTACIÓN",
      gift: "Conjunto para bebé (3-6) meses + Pañales Etapa 2",
      description: "Conjunto para bebé (3-6) meses + Pañales Winny Etapa 2 (6-9kg)",
      brands: "EPK + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 24,
      category: "ALIMENTACIÓN",
      gift: "Extractor de leche manual o automático + Pañales Etapa 1",
      description: "Extractor manual cómodo y eficiente + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Medela + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 25,
      category: "ALIMENTACIÓN",
      gift: "Vajilla para bebé + Pañales Etapa 3",
      description: "Platos, vasos y cubiertos antideslizantes + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Munchkin + Winny Etapa 3",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 26,
      category: "ALIMENTACIÓN",
      gift: "Protector de pezones + Pañales Etapa 1",
      description: "Protectores para lactancia cómodos + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Medela + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 27,
      category: "ALIMENTACIÓN",
      gift: "Almohada de lactancia + Pañales Etapa 1",
      description: "Almohada ergonómica para lactancia cómoda + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Boppy + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // TRANSPORTE Y PASEO (2 items)
    {
      id: 28,
      category: "TRANSPORTE Y PASEO",
      gift: "Canguro/Portabebés ergonómico + Pañales Etapa 2",
      description: "Portabebés con múltiples posiciones + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Ergobaby + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 29,
      category: "TRANSPORTE Y PASEO",
      gift: "Caminador con juguetes + Pañales Etapa 3",
      description: "Caminador musical con actividades + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Chicco + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // JUGUETES Y ESTIMULACIÓN (8 items)
    {
      id: 30,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Gimnasio de actividades + Pañales Etapa 1",
      description: "Manta de juegos con arcos y juguetes colgantes + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Fisher-Price + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 31,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Sonajeros estimulantes + Pañales Etapa 1",
      description: "Set de sonajeros con diferentes texturas y sonidos + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Fisher-Price + Winny Etapa 1",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 32,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Mordederas sensoriales + Pañales Etapa 2",
      description: "Mordederas de silicona con diferentes formas + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Chicco + Winny Etapa 2",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 33,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Mordedoras avanzadas + Pañales Etapa 3",
      description: "Mordedoras con gel refrigerante y texturas + Pañales Winny Etapa 3 (8-12kg)",
      brands: "MAM + Winny Etapa 3",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 34,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Móvil musical para cuna + Pañales Etapa 2",
      description: "Móvil con melodías y figuras rotativas + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Chicco + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 35,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Juguetes educativos + Pañales Etapa 3",
      description: "Cubos apilables y encajables para desarrollo + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Fisher-Price + Winny Etapa 3",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 36,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Libros de tela + Pañales Etapa 2",
      description: "Libros suaves con texturas y sonidos + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Fisher-Price + Winny Etapa 2",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 37,
      category: "JUGUETES Y ESTIMULACIÓN",
      gift: "Peluche musical + Pañales Etapa 2",
      description: "Peluche suave con melodías relajantes + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Chicco + Winny Etapa 2",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // REGALOS ESPECIALES PREMIUM (5 items)
    {
      id: 38,
      category: "REGALOS ESPECIALES PREMIUM",
      gift: "Coche Premium con accesorios",
      description: "Coche completo con base para carro, lluvia, mosquitero y bolso",
      brands: "Graco, Chicco",
      store: "Falabella / Alkosto",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 39,
      category: "REGALOS ESPECIALES PREMIUM",
      gift: "Mecedora automática musical",
      description: "Mecedora con movimiento automático, música y control remoto",
      brands: "Muebles Jamar, Alkosto",
      store: "Alkosto / Falabella",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 40,
      category: "REGALOS ESPECIALES PREMIUM",
      gift: "Gimnasio completo safari",
      description: "Gimnasio con múltiples juguetes, luces, sonidos y temática safari",
      brands: "Fisher-Price, Chicco",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 41,
      category: "REGALOS ESPECIALES PREMIUM",
      gift: "Tina Bañera para Bebé",
      description: "Tina Bañera para Bebé y termómetro infrarrojo",
      brands: "Safety 1st, Chicco",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 42,
      category: "REGALOS ESPECIALES PREMIUM",
      gift: "Humidificador con aromaterapia",
      description: "Humidificador ultrasónico con luz nocturna y aromas",
      brands: "Crane, Safety 1st",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
  ];

  // Función para obtener el emoji de categoría
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "ROPA Y ACCESORIOS":
        return "👕";
      case "HIGIENE Y CUIDADO":
        return "🧴";
      case "DORMITORIO Y DESCANSO":
        return "🛏️";
      case "ALIMENTACIÓN":
        return "🍼";
      case "TRANSPORTE Y PASEO":
        return "🚗";
      case "JUGUETES Y ESTIMULACIÓN":
        return "🧸";
      case "REGALOS ESPECIALES PREMIUM":
        return "⭐";
      default:
        return "🎁";
    }
  };

  // Función para obtener el color de categoría
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ROPA Y ACCESORIOS":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "HIGIENE Y CUIDADO":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "DORMITORIO Y DESCANSO":
        return "bg-indigo-100 text-indigo-700 border-indigo-300";
      case "ALIMENTACIÓN":
        return "bg-pink-100 text-pink-700 border-pink-300";
      case "TRANSPORTE Y PASEO":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "JUGUETES Y ESTIMULACIÓN":
        return "bg-green-100 text-green-700 border-green-300";
      case "REGALOS ESPECIALES PREMIUM":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // Función para obtener el color de borde de categoría
  const getCategoryBorderColor = (category: string) => {
    switch (category) {
      case "ROPA Y ACCESORIOS":
        return "border-blue-300";
      case "HIGIENE Y CUIDADO":
        return "border-purple-300";
      case "DORMITORIO Y DESCANSO":
        return "border-indigo-300";
      case "ALIMENTACIÓN":
        return "border-pink-300";
      case "TRANSPORTE Y PASEO":
        return "border-orange-300";
      case "JUGUETES Y ESTIMULACIÓN":
        return "border-green-300";
      case "REGALOS ESPECIALES PREMIUM":
        return "border-yellow-300";
      default:
        return "border-gray-300";
    }
  };

  // Función para obtener el fondo de categoría
  const getCategoryBackgroundColor = (category: string) => {
    switch (category) {
      case "ROPA Y ACCESORIOS":
        return "bg-gradient-to-br from-blue-50 via-blue-25 to-white";
      case "HIGIENE Y CUIDADO":
        return "bg-gradient-to-br from-purple-50 via-purple-25 to-white";
      case "DORMITORIO Y DESCANSO":
        return "bg-gradient-to-br from-indigo-50 via-indigo-25 to-white";
      case "ALIMENTACIÓN":
        return "bg-gradient-to-br from-pink-50 via-pink-25 to-white";
      case "TRANSPORTE Y PASEO":
        return "bg-gradient-to-br from-orange-50 via-orange-25 to-white";
      case "JUGUETES Y ESTIMULACIÓN":
        return "bg-gradient-to-br from-green-50 via-green-25 to-white";
      case "REGALOS ESPECIALES PREMIUM":
        return "bg-gradient-to-br from-yellow-50 via-yellow-25 to-white";
      default:
        return "bg-gradient-to-br from-gray-50 via-gray-25 to-white";
    }
  };

  // Función para obtener el estilo del header de categoría
  const getCategoryHeaderStyle = (category: string) => {
    switch (category) {
      case "ROPA Y ACCESORIOS":
        return "bg-gradient-to-r from-blue-200 to-blue-300 border-blue-400";
      case "HIGIENE Y CUIDADO":
        return "bg-gradient-to-r from-purple-200 to-purple-300 border-purple-400";
      case "DORMITORIO Y DESCANSO":
        return "bg-gradient-to-r from-indigo-200 to-indigo-300 border-indigo-400";
      case "ALIMENTACIÓN":
        return "bg-gradient-to-r from-pink-200 to-pink-300 border-pink-400";
      case "TRANSPORTE Y PASEO":
        return "bg-gradient-to-r from-orange-200 to-orange-300 border-orange-400";
      case "JUGUETES Y ESTIMULACIÓN":
        return "bg-gradient-to-r from-green-200 to-green-300 border-green-400";
      case "REGALOS ESPECIALES PREMIUM":
        return "bg-gradient-to-r from-yellow-200 to-yellow-300 border-yellow-400";
      default:
        return "bg-gradient-to-r from-gray-200 to-gray-300 border-gray-400";
    }
  };

  // Inicializar Firebase si es la primera vez
  const initializeFirestore = useCallback(async () => {
    try {
      const giftsCollection = collection(db, 'gifts');
      const snapshot = await getDocs(giftsCollection);
      
      console.log('🔍 Verificando estado de Firebase...');
      console.log(`📊 Documentos encontrados: ${snapshot.docs.length}`);
      
      if (snapshot.empty || snapshot.docs.length < initialGifts.length) {
        // Reinicializar todos los datos
        console.log('🦁 Inicializando/Actualizando safari de regalos...');
        console.log(`📋 Total de regalos a inicializar: ${initialGifts.length}`);
        
        // Subir todos los regalos en batch para mejor performance
        const promises = initialGifts.map(async (gift) => {
          try {
            await setDoc(doc(db, 'gifts', gift.id.toString()), gift);
            console.log(`✅ Regalo ${gift.id} guardado: ${gift.gift.substring(0, 30)}...`);
          } catch (error) {
            console.error(`❌ Error guardando regalo ${gift.id}:`, error);
          }
        });
        
        await Promise.all(promises);
        
        console.log('✅ Safari de regalos inicializado exitosamente!');
        console.log(`📊 Total de regalos inicializados: ${initialGifts.length}`);
        
        // Verificar categorías
        const categories = Array.from(new Set(initialGifts.map(gift => gift.category)));
        console.log('🏷️ Categorías inicializadas:', categories);
        categories.forEach(cat => {
          const count = initialGifts.filter(gift => gift.category === cat).length;
          console.log(`  ${getCategoryEmoji(cat)} ${cat}: ${count} regalos`);
        });
      } else {
        console.log(`📊 Safari ya inicializado con ${snapshot.docs.length} regalos`);
        
        // Debug categorías existentes
        const existingGifts = snapshot.docs.map(doc => doc.data());
        const existingCategories = Array.from(new Set(existingGifts.map(gift => gift.category)));
        console.log('🏷️ Categorías existentes:', existingCategories);
        
        // Verificar si hay regalos sin categoría o con categorías incorrectas
        existingGifts.forEach(gift => {
          if (!gift.category || typeof gift.category !== 'string') {
            console.warn(`⚠️ Regalo sin categoría válida:`, gift);
          }
        });
      }
    } catch (error) {
      console.error('❌ Error inicializando Firestore:', error);
    }
  }, []);

  // Escuchar cambios en tiempo real
  useEffect(() => {
    console.log('🔄 Configurando conexión en tiempo real...');
    
    const unsubscribe = onSnapshot(
      collection(db, 'gifts'),
      (snapshot) => {
        console.log(`📡 Snapshot recibido: ${snapshot.docs.length} documentos`);
        
        const giftsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: parseInt(doc.id)
          };
        }) as Gift[];
        
        // Ordenar por ID
        giftsData.sort((a, b) => a.id - b.id);
        
        // Debug detallado
        console.log(`📊 Datos procesados: ${giftsData.length} regalos`);
        
        // Verificar todas las categorías
        const categories = Array.from(new Set(giftsData.map(gift => gift.category)));
        console.log('🏷️ Categorías encontradas:', categories);
        console.log('📋 Resumen detallado por categoría:');
        categories.forEach(cat => {
          const categoryGifts = giftsData.filter(gift => gift.category === cat);
          const count = categoryGifts.length;
          console.log(`  ${getCategoryEmoji(cat)} ${cat}: ${count} regalos`);
          
          // Mostrar IDs de cada categoría para debug
          const ids = categoryGifts.map(g => g.id).sort((a, b) => a - b);
          console.log(`    📌 IDs: ${ids.join(', ')}`);
        });
        
        // Verificar si hay regalos sin categoría
        const withoutCategory = giftsData.filter(gift => !gift.category || gift.category.trim() === '');
        if (withoutCategory.length > 0) {
          console.warn('⚠️ Regalos sin categoría:', withoutCategory);
        }
        
        setGifts(giftsData);
        setIsLoading(false);
        console.log(`✅ Estado actualizado - Total: ${giftsData.length} regalos cargados`);
      },
      (error) => {
        console.error('❌ Error escuchando cambios:', error);
        setIsLoading(false);
      }
    );

    // Inicializar si es necesario
    initializeFirestore();

    // Mostrar instrucciones después de cargar
    setTimeout(() => {
      setShowInstructions(true);
    }, 2000);

    return () => {
      console.log('🔌 Desconectando tiempo real...');
      unsubscribe();
    };
  }, [initializeFirestore]);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^3[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3").trim();
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhone(value);
    setUserPhone(formatted);

    if (value && !validatePhone(value)) {
      setPhoneError("Ingresa un número válido (ej: 320 123 4567)");
    } else {
      setPhoneError("");
    }
  };

  const handleSelectGift = (gift: Gift) => {
    if (gift.reserved) return;
    setSelectedGift(gift);
    setUserName("");
    setUserPhone("");
    setPhoneError("");
  };

  // Reservar regalo en Firebase
  const handleReserveGift = async () => {
    if (!selectedGift || !userName.trim() || !userPhone.trim() || !validatePhone(userPhone)) {
      return;
    }

    try {
      console.log(`🎁 Reservando regalo: ${selectedGift.gift}`);
      const giftRef = doc(db, 'gifts', selectedGift.id.toString());
      await updateDoc(giftRef, {
        reserved: true,
        reservedBy: userName.trim(),
        phone: userPhone.trim(),
      });

      setSelectedGift(null);
      setUserName("");
      setUserPhone("");
      setPhoneError("");
      
      console.log('✅ Regalo reservado exitosamente!');
      alert('🦁 ¡Regalo reservado exitosamente para el safari de Maximiliano! 🎁');
    } catch (error) {
      console.error('❌ Error reservando regalo:', error);
      alert('Error al reservar. Intenta de nuevo.');
    }
  };

  // Cancelar reserva en Firebase
  const handleCancelReservation = async (giftId: number) => {
    if (!window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      return;
    }

    try {
      console.log(`🔄 Cancelando reserva del regalo ID: ${giftId}`);
      const giftRef = doc(db, 'gifts', giftId.toString());
      await updateDoc(giftRef, {
        reserved: false,
        reservedBy: "",
        phone: "",
      });
      console.log('✅ Reserva cancelada exitosamente!');
    } catch (error) {
      console.error('❌ Error cancelando reserva:', error);
      alert('Error al cancelar. Intenta de nuevo.');
    }
  };

  // Reset todas las reservas
  const resetAllReservations = async () => {
    if (!window.confirm("🦁 ¿Estás seguro de que quieres borrar todas las reservas del safari?")) {
      return;
    }

    try {
      console.log('🔄 Reseteando todas las reservas...');
      const batch = [];
      for (const gift of gifts) {
        if (gift.reserved) {
          const giftRef = doc(db, 'gifts', gift.id.toString());
          batch.push(updateDoc(giftRef, {
            reserved: false,
            reservedBy: "",
            phone: "",
          }));
        }
      }
      await Promise.all(batch);
      console.log('✅ Todas las reservas han sido eliminadas');
      alert('🦁 Todas las reservas del safari han sido eliminadas.');
    } catch (error) {
      console.error('❌ Error reseteando reservas:', error);
      alert('Error al resetear. Intenta de nuevo.');
    }
  };

  // Función para reinicializar todos los datos de Firebase
  const forceReinitialize = async () => {
    if (!window.confirm("🔄 ¿Estás seguro de que quieres reinicializar TODOS los datos del safari? Esto borrará todas las reservas y recargará los 42 regalos.")) {
      return;
    }

    try {
      console.log('🔄 Reinicializando todos los datos...');
      setIsLoading(true);
      
      // Borrar todos los documentos existentes
      const giftsCollection = collection(db, 'gifts');
      const snapshot = await getDocs(giftsCollection);
      
      console.log(`🗑️ Borrando ${snapshot.docs.length} documentos existentes...`);
      const deletePromises = snapshot.docs.map(docSnapshot => 
        updateDoc(doc(db, 'gifts', docSnapshot.id), {
          reserved: false,
          reservedBy: "",
          phone: "",
        })
      );
      await Promise.all(deletePromises);
      
      // Reinicializar con datos frescos
      console.log('📝 Subiendo datos frescos...');
      const uploadPromises = initialGifts.map(async (gift) => {
        await setDoc(doc(db, 'gifts', gift.id.toString()), gift);
      });
      await Promise.all(uploadPromises);
      
      console.log('✅ Reinicialización completa exitosa!');
      alert('🦁 Safari de regalos reinicializado exitosamente! Todas las categorías deberían aparecer ahora.');
      
    } catch (error) {
      console.error('❌ Error en reinicialización:', error);
      alert('Error al reinicializar. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGifts = useMemo(() => {
    const filtered = gifts.filter((gift) => {
      const matchesSearch =
        gift.gift.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.brands.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = showReserved ? gift.reserved : !gift.reserved;

      return matchesSearch && matchesFilter;
    });

    console.log(`🔍 Filtrados: ${filtered.length} de ${gifts.length} regalos`);
    
    // Debug de categorías en filtrados
    const filteredCategories = Array.from(new Set(filtered.map(gift => gift.category)));
    console.log('🏷️ Categorías en filtrados:', filteredCategories);
    
    return filtered;
  }, [gifts, searchTerm, showReserved]);

  const groupedGifts = useMemo(() => {
    const grouped = filteredGifts.reduce((acc, gift) => {
      if (!acc[gift.category]) {
        acc[gift.category] = [];
      }
      acc[gift.category].push(gift);
      return acc;
    }, {} as Record<string, Gift[]>);

    console.log('📊 Agrupados por categoría:', Object.keys(grouped));
    Object.entries(grouped).forEach(([cat, gifts]) => {
      console.log(`  ${getCategoryEmoji(cat)} ${cat}: ${gifts.length} regalos`);
    });

    // Verificar que tenemos las 7 categorías esperadas
    const expectedCategories = [
      "ROPA Y ACCESORIOS",
      "HIGIENE Y CUIDADO", 
      "DORMITORIO Y DESCANSO",
      "ALIMENTACIÓN",
      "TRANSPORTE Y PASEO",
      "JUGUETES Y ESTIMULACIÓN",
      "REGALOS ESPECIALES PREMIUM"
    ];
    
    const missingCategories = expectedCategories.filter(cat => !Object.keys(grouped).includes(cat));
    if (missingCategories.length > 0) {
      console.warn('⚠️ Categorías faltantes:', missingCategories);
    }

    return grouped;
  }, [filteredGifts]);

  const stats = useMemo(() => {
    const totalReserved = gifts.filter((gift) => gift.reserved).length;
    const totalGifts = gifts.length;
    const percentage = totalGifts > 0 ? Math.round((totalReserved / totalGifts) * 100) : 0;
    return { totalReserved, totalGifts, percentage };
  }, [gifts]);

  const generateSummary = () => {
    const reservedGifts = gifts.filter((gift) => gift.reserved);
    return reservedGifts
      .map((gift) => `${gift.reservedBy} (${gift.phone}): ${gift.gift}`)
      .join("\n");
  };

  const generateWhatsAppLink = () => {
    const reservedGifts = gifts.filter((gift) => gift.reserved);
    const message = `🦁 *Resumen de Regalos Baby Shower Safari - Maximiliano*\n\n${reservedGifts
      .map((gift) => `• ${gift.reservedBy} (${gift.phone}): ${gift.gift}`)
      .join("\n")}\n\n📊 Total: ${stats.totalReserved} de ${
      stats.totalGifts
    } regalos reservados\n\n🌿 ¡Gracias por ser parte de nuestra aventura safari!`;

    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-300 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 text-lg">🦁 Conectando con el safari de regalos...</p>
          <p className="text-green-600 text-sm mt-2">⚡ Configurando tiempo real</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-amber-100 p-2 sm:p-4">
      {/* Indicador de tiempo real */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-40">
        <div className="bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium flex items-center gap-1 sm:gap-2 shadow-lg">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
          <span className="hidden sm:inline">⚡ Safari en Tiempo Real</span>
          <span className="sm:hidden">⚡ Live</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-yellow-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center shadow-2xl mb-4 sm:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Gift className="w-6 sm:w-10 h-6 sm:h-10 animate-bounce" />
            <h1 className="text-2xl sm:text-4xl font-bold">
              🦁 Baby Shower Safari - Maximiliano 🐾
            </h1>
            <Heart className="w-6 sm:w-10 h-6 sm:h-10 animate-pulse text-yellow-300" />
          </div>

          <p className="text-sm sm:text-xl opacity-90 mb-4 sm:mb-6">
            🎁 Aventura Safari: Regalos únicos pensando en tu presupuesto 🌿
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-4 sm:w-6 h-4 sm:h-6 text-green-300" />
                <span className="font-semibold text-sm sm:text-lg">
                  {stats.totalGifts - stats.totalReserved} Disponibles
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 sm:w-6 h-4 sm:h-6 text-yellow-300" />
                <span className="font-semibold text-sm sm:text-lg">
                  {stats.totalReserved} Reservados
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="w-4 sm:w-6 h-4 sm:h-6 text-amber-300" />
                <span className="font-semibold text-sm sm:text-lg">
                  {stats.percentage}% Completado
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-3 sm:h-4 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-yellow-500 h-full transition-all duration-1000 ease-out"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm opacity-90">Progreso de nuestra aventura safari 🦁</p>
        </div>

        {/* Controls */}
        <div className="bg-amber-50 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-green-200">
          <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-4 sm:w-5 h-4 sm:h-5" />
              <input
                type="text"
                placeholder="🔍 Buscar regalo, marca, categoría..."
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border-2 border-green-300 rounded-lg sm:rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-sm sm:text-lg bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setShowInstructions(true)}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-amber-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-amber-700 transition-all shadow-lg text-xs sm:text-sm"
              >
                <Info className="w-3 sm:w-4 h-3 sm:h-4" />
                📋 <span className="hidden sm:inline">Instrucciones</span><span className="sm:hidden">Info</span>
              </button>
              <button
                onClick={() => setShowReserved(!showReserved)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-xs sm:text-sm ${
                  showReserved
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                <Filter className="w-3 sm:w-4 h-3 sm:h-4" />
                {showReserved ? "✅ Reservados" : "📋 Disponibles"}
              </button>
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-yellow-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-yellow-700 transition-all shadow-lg text-xs sm:text-sm"
              >
                <BarChart3 className="w-3 sm:w-4 h-3 sm:h-4" />
                📊 <span className="hidden sm:inline">Resumen</span>
              </button>
              <button
                onClick={resetAllReservations}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-red-700 transition-all shadow-lg text-xs sm:text-sm"
                title="Reiniciar todas las reservas"
              >
                <RefreshCw className="w-3 sm:w-4 h-3 sm:h-4" />
                🔄 <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={forceReinitialize}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg sm:rounded-xl font-medium hover:bg-purple-700 transition-all shadow-lg text-xs sm:text-sm"
                title="Reinicializar todos los datos del safari"
              >
                <RefreshCw className="w-3 sm:w-4 h-3 sm:h-4" />
                🔧 <span className="hidden sm:inline">Reinicializar</span><span className="sm:hidden">Fix</span>
              </button>
            </div>
          </div>

          {/* Debug Info */}
          <div className="text-center text-xs sm:text-sm text-green-600">
            <p>📊 Total: {gifts.length} | Mostrando: {filteredGifts.length} | Categorías: {Object.keys(groupedGifts).length}</p>
            <p className="mt-1">
              🏷️ Categorías activas: {Object.keys(groupedGifts).map(cat => getCategoryEmoji(cat)).join(' ')}
            </p>
            {gifts.length !== 42 && (
              <p className="text-orange-600 font-semibold mt-1">
                ⚠️ Se esperan 42 regalos, pero solo hay {gifts.length}. Usa el botón &ldquo;Reinicializar&rdquo; si es necesario.
              </p>
            )}
          </div>
        </div>

        {/* Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-lg">
            <div className="bg-gradient-to-br from-amber-50 via-green-50 to-yellow-50 rounded-3xl sm:rounded-3xl p-6 sm:p-10 max-w-lg sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-gradient-to-r from-green-400 to-yellow-400 relative">
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 text-2xl sm:text-4xl animate-bounce">🦁</div>
              <div className="absolute top-4 right-16 text-xl sm:text-3xl animate-pulse">🌿</div>
              <div className="absolute bottom-4 left-6 text-lg sm:text-2xl animate-bounce delay-100">🐾</div>
              <div className="absolute bottom-4 right-4 text-xl sm:text-3xl animate-pulse delay-200">🎁</div>
              
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-transparent flex items-center gap-3">
                  ✨ Bienvenidos al Safari de Maximiliano ✨
                </h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-green-600 hover:text-green-800 p-2 sm:p-3 rounded-full hover:bg-green-100 transition-all shadow-lg bg-white/80"
                >
                  <X className="w-6 sm:w-8 h-6 sm:h-8" />
                </button>
              </div>

              {/* Hero Section */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="bg-gradient-to-r from-green-600 to-yellow-500 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
                  <h4 className="text-xl sm:text-3xl font-bold mb-4">🦁 ¡Únete a Nuestra Aventura Safari! 🌿</h4>
                  <p className="text-sm sm:text-lg opacity-90 leading-relaxed">
                    Ayúdanos a preparar todo lo necesario para la llegada de nuestro pequeño explorador. 
                    <br className="hidden sm:block" />
                    ¡Cada regalo es una pieza especial de su aventura! 🐾
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 text-left">
                {/* Cómo Funciona */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                  <h5 className="text-lg sm:text-2xl font-bold text-green-700 flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    🐾 Cómo Funciona
                  </h5>
                  <div className="space-y-4 text-sm sm:text-base text-green-800">
                    <div className="flex items-start gap-4 bg-green-50 p-4 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-semibold">Explora los Regalos</p>
                        <p className="text-sm opacity-80">Navega por las categorías y encuentra el regalo perfecto</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Ingresa tus Datos</p>
                        <p className="text-sm opacity-80">Comparte tu nombre y teléfono para coordinar</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-green-50 p-4 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-semibold">¡Reserva Confirmada!</p>
                        <p className="text-sm opacity-80">Tu regalo queda apartado y todos lo verán en tiempo real</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información Importante */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
                  <h5 className="text-lg sm:text-2xl font-bold text-yellow-700 flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    🌟 Información Clave
                  </h5>
                  <div className="space-y-3 text-sm sm:text-base text-yellow-800">
                    <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded-xl">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span><strong>📦 Pañales Winny:</strong> Cada regalo incluye la etapa correspondiente</span>
                    </div>
                    <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                      <span><strong>🏷️ Categorías:</strong> 7 secciones organizadas con emojis</span>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl">
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span><strong>🔒 Reservas:</strong> Una vez elegido, nadie más podrá tomarlo</span>
                    </div>
                    <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl">
                      <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span><strong>⚡ Tiempo Real:</strong> Se actualiza instantáneamente</span>
                    </div>
                    <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-xl">
                      <div className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span><strong>🛒 Tiendas:</strong> Alkosto, Falabella, Éxito, Pepe Ganga</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories Preview */}
              <div className="mt-8 bg-gradient-to-r from-green-100 via-yellow-100 to-amber-100 rounded-2xl p-6 border-2 border-green-300">
                <h5 className="text-lg sm:text-2xl font-bold text-green-800 mb-6 text-center flex items-center justify-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                  🎁 42 Regalos en 7 Categorías Safari 🌿
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-center border-2 border-blue-200">
                    <div className="text-2xl mb-2">👕</div>
                    <p className="text-xs sm:text-sm font-bold text-blue-700">Ropa & Accesorios</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl text-center border-2 border-purple-200">
                    <div className="text-2xl mb-2">🧴</div>
                    <p className="text-xs sm:text-sm font-bold text-purple-700">Higiene & Cuidado</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-xl text-center border-2 border-indigo-200">
                    <div className="text-2xl mb-2">🛏️</div>
                    <p className="text-xs sm:text-sm font-bold text-indigo-700">Dormitorio</p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-xl text-center border-2 border-pink-200">
                    <div className="text-2xl mb-2">🍼</div>
                    <p className="text-xs sm:text-sm font-bold text-pink-700">Alimentación</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-xl text-center border-2 border-orange-200">
                    <div className="text-2xl mb-2">🚗</div>
                    <p className="text-xs sm:text-sm font-bold text-orange-700">Transporte</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-xl text-center border-2 border-green-200">
                    <div className="text-2xl mb-2">🧸</div>
                    <p className="text-xs sm:text-sm font-bold text-green-700">Juguetes</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-xl text-center border-2 border-yellow-200 sm:col-span-2">
                    <div className="text-2xl mb-2">⭐</div>
                    <p className="text-xs sm:text-sm font-bold text-yellow-700">Regalos Premium</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold hover:from-green-700 hover:to-yellow-600 transition-all shadow-xl text-lg sm:text-xl transform hover:scale-105"
                >
                  🦁 ¡Comenzar Safari de Regalos! 🎁
                </button>
                <p className="text-sm text-green-600 mt-3 opacity-80">¡Gracias por ser parte de nuestra aventura! 🌿</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm">
            <div className="bg-amber-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-sm sm:max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border-4 border-green-300">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-3xl font-bold text-green-800 flex items-center gap-2">
                  <BarChart3 className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
                  <span className="hidden sm:inline">Resumen Safari</span>
                  <span className="sm:hidden">Resumen</span>
                </h3>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-green-600 hover:text-green-800 p-1 sm:p-2 rounded-full hover:bg-green-100 transition-all"
                >
                  <X className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
              </div>

              <div className="bg-green-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 border-2 border-green-200">
                <pre className="whitespace-pre-wrap text-xs sm:text-sm text-green-800 font-mono">
                  {generateSummary() || "No hay reservas aún..."}
                </pre>
              </div>

              <div className="text-center space-y-3 sm:space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-green-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-green-300">
                    <p className="text-xl sm:text-2xl font-bold text-green-700">
                      {stats.totalReserved}
                    </p>
                    <p className="text-xs sm:text-sm text-green-600">Reservados</p>
                  </div>
                  <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-yellow-300">
                    <p className="text-xl sm:text-2xl font-bold text-yellow-700">
                      {stats.totalGifts - stats.totalReserved}
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-600">Disponibles</p>
                  </div>
                </div>

                {stats.totalReserved > 0 && (
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-green-700 transition-all shadow-lg text-xs sm:text-sm"
                  >
                    <Share2 className="w-4 sm:w-5 h-4 sm:h-5" />
                    📱 Compartir por WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gift List - Categorías Independientes */}
        <div className="space-y-8 sm:space-y-12">
          {Object.keys(groupedGifts).length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-amber-50 rounded-2xl sm:rounded-3xl shadow-lg border-2 border-green-200">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
                {gifts.length === 0 ? "Conectando con Firebase..." : "No se encontraron regalos"}
              </h3>
              <p className="text-green-600 text-sm sm:text-base">
                {gifts.length === 0 
                  ? "Verifica tu conexión a Firebase" 
                  : "Intenta con otro término de búsqueda"
                }
              </p>
            </div>
          ) : (
            Object.entries(groupedGifts).map(([category, categoryGifts], index) => (
              <div
                key={category}
                className="relative"
              >
                {/* Separador Visual entre Categorías */}
                {index > 0 && (
                  <div className="flex items-center justify-center mb-8 sm:mb-12">
                    <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                    <div className="mx-4 text-2xl sm:text-3xl">🌿</div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                  </div>
                )}
                
                {/* Sección de Categoría */}
                <div className={`rounded-3xl shadow-2xl p-6 sm:p-10 border-4 transform transition-all duration-500 hover:scale-[1.02] ${getCategoryBorderColor(category)} ${getCategoryBackgroundColor(category)}`}>
                  {/* Header de Categoría */}
                  <div className="text-center mb-8 sm:mb-10">
                    <div className={`inline-flex items-center gap-4 px-6 sm:px-8 py-4 sm:py-6 rounded-2xl shadow-xl border-3 ${getCategoryHeaderStyle(category)}`}>
                      <div className="text-4xl sm:text-6xl animate-bounce">
                        {getCategoryEmoji(category)}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl sm:text-3xl font-bold text-gray-800">
                          {category}
                        </h3>
                        <span className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm sm:text-base font-semibold bg-white/80 text-gray-700 shadow-md">
                          <Star className="w-4 h-4" />
                          {categoryGifts.length} regalo{categoryGifts.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Grid de Regalos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {categoryGifts.map((gift) => (
                      <div
                        key={gift.id}
                        className={`relative group rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                          gift.reserved
                            ? "border-green-500 bg-green-100 shadow-lg"
                            : selectedGift?.id === gift.id
                            ? "border-yellow-500 bg-yellow-100 shadow-xl scale-105"
                            : "border-green-300 bg-white hover:border-yellow-500 hover:shadow-xl hover:scale-105 cursor-pointer"
                        }`}
                        onClick={() => !gift.reserved && handleSelectGift(gift)}
                      >
                        <div className="p-3 sm:p-6 h-full flex flex-col">
                          {/* Categoría Badge */}
                          <div className="mb-3 sm:mb-4">
                            <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(gift.category)}`}>
                              <Tag className="w-3 h-3" />
                              <span className="hidden sm:inline">{getCategoryEmoji(gift.category)} {gift.category}</span>
                              <span className="sm:hidden">{getCategoryEmoji(gift.category)}</span>
                            </span>
                          </div>

                          <div className="flex-1 space-y-2 sm:space-y-3">
                            <h4
                              className={`font-bold text-sm sm:text-lg leading-tight ${
                                gift.reserved ? "text-green-800" : "text-green-900"
                              }`}
                            >
                              🎁 {gift.gift}
                            </h4>

                            <p className="text-xs sm:text-sm text-green-700 leading-relaxed">
                              {gift.description}
                            </p>

                            <div className="space-y-1 sm:space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                <p className="text-xs font-medium text-green-700">
                                  🏪 {gift.store}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                                <p className="text-xs italic text-yellow-700">
                                  {gift.brands}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-200">
                            {gift.reserved ? (
                              <div className="space-y-2 sm:space-y-3">
                                <div className="bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center text-xs sm:text-sm font-medium">
                                  <div className="flex items-center justify-center gap-2 mb-1">
                                    <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4" />
                                    <span>✅ Reservado</span>
                                  </div>
                                  <div className="flex items-center justify-center gap-1">
                                    <User className="w-3 h-3" />
                                    <strong>{gift.reservedBy}</strong>
                                  </div>
                                  <div className="flex items-center justify-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    <span>{gift.phone}</span>
                                  </div>
                                </div>
                                {showReserved && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCancelReservation(gift.id);
                                    }}
                                    className="w-full bg-red-500 text-white px-3 py-2 rounded-lg text-xs hover:bg-red-600 transition-colors"
                                  >
                                    Cancelar Reserva
                                  </button>
                                )}
                              </div>
                            ) : (
                              <button className="w-full bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-green-700 transition-all text-xs sm:text-sm">
                                <Gift className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 inline" />
                                Seleccionar Regalo
                              </button>
                            )}
                          </div>
                        </div>

                        {!gift.reserved && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reservation Modal */}
        {selectedGift && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm">
            <div className="bg-amber-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-sm sm:max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-green-300">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Gift className="w-6 sm:w-8 h-6 sm:h-8 text-green-700" />
                </div>
                <h3 className="text-xl sm:text-3xl font-bold text-green-800">
                  🦁 Reservar Regalo Safari
                </h3>
              </div>

              <div className="bg-green-100 p-3 sm:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 border-2 border-green-300">
                <div className="mb-2 sm:mb-3">
                  <span className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedGift.category)}`}>
                    <Tag className="w-3 h-3" />
                    {getCategoryEmoji(selectedGift.category)} {selectedGift.category}
                  </span>
                </div>
                <h4 className="font-bold mb-2 sm:mb-3 text-lg sm:text-xl text-green-800 flex items-center gap-2">
                  <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-600" />
                  {selectedGift.gift}
                </h4>
                <p className="text-xs sm:text-sm text-green-700 mb-2 sm:mb-3 leading-relaxed">
                  {selectedGift.description}
                </p>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs font-medium text-green-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    🏪 {selectedGift.store}
                  </p>
                  <p className="text-xs italic text-yellow-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    {selectedGift.brands}
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <div>
                  <label className="block text-sm sm:text-lg font-semibold text-green-800 mb-2 sm:mb-3 flex items-center gap-2">
                    <User className="w-4 sm:w-5 h-4 sm:h-5 text-green-700" />
                    Tu nombre completo:
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ej: María González"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-green-300 rounded-lg sm:rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-sm sm:text-lg bg-white"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-lg font-semibold text-green-800 mb-2 sm:mb-3 flex items-center gap-2">
                    <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-green-700" />
                    Tu número de celular:
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={handlePhoneChange}
                    placeholder="Ej: 320 123 4567"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-4 outline-none transition-all text-sm sm:text-lg bg-white ${
                      phoneError
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-green-300 focus:border-green-500 focus:ring-green-100"
                    }`}
                    maxLength={13}
                    onKeyPress={(e) => {
                      if (
                        e.key === "Enter" &&
                        userName.trim() &&
                        userPhone.trim() &&
                        !phoneError
                      ) {
                        handleReserveGift();
                      }
                    }}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-2">
                      <X className="w-3 sm:w-4 h-3 sm:h-4" />
                      {phoneError}
                    </p>
                  )}
              <p className="text-green-600 text-xs sm:text-sm mt-2 flex items-center gap-2">
                <Phone className="w-3 sm:w-4 h-3 sm:h-4" />
                Formato: número colombiano de 10 dígitos
              </p>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-4">
                <button
                  onClick={() => {
                    setSelectedGift(null);
                    setPhoneError("");
                  }}
                  className="flex-1 bg-amber-600 text-white text-sm sm:text-lg py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium hover:bg-amber-700 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReserveGift}
                  disabled={
                    !userName.trim() || !userPhone.trim() || !!phoneError
                  }
                  className="flex-1 bg-green-600 text-white text-sm sm:text-lg py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  ✅ Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="text-green-600 text-xs sm:text-sm">
            <p className="flex items-center justify-center gap-2">
              <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-600" />
              🦁 Hecho con amor safari para el Baby Shower de Maximiliano 🌿
              <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-600" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}