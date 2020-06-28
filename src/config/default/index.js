import * as yup from 'yup';

export const cities = ['Santander de quilichao', 'Villarrica', 'Puerto tejada', 'Caloto'];

export const departments = ['Cauca'];

export const optionsId = [
      'Tarjeta de identidad',
      'Cedula de ciudadania',
      'Pasaporte',
      'Cedula de extranjeria',
   ];

export const optionsTest = [
      'Positivo',
      'Negativo',
      'Sin prueba',
      'En espera de resultados',
   ];

export const validationSchema = yup.object({
      name: yup.string().required('Campo requerido'),
      address: yup.string().required('Campo requerido'),
      city: yup.string().required('Campo requerido'),
      state: yup.string().required('Campo requerido'),
      documentType: yup.string().required('Campo requerido'),
      id: yup.number().required('Campo requerido'),
      expeditionDate: yup.string().required('Campo requerido'),
      testResult: yup.string().required('Campo requerido'),
      phone: yup.number().required('Campo requerido'),
      email: yup.string().required('Campo requerido'),
   });

   export const validationZoneSchema = yup.object({
      name: yup.string().required('Campo requerido'),
      address: yup.string().required('Campo requerido'),
      city: yup.string().required('Campo requerido'),
      state: yup.string().required('Campo requerido'),
   });

   export const dataSource = (coor) => {
      return {
         type: 'FeatureCollection',
         features: [
            {
               type: 'Feature',
               id: '1',
               properties: {
                  icon: 'locationIcon',
               },
               geometry: {
                  type: 'Point',
                  coordinates: coor,
               },
            },
         ],
      };
   };