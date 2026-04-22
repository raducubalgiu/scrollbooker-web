import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import AppointmentCard from "./AppointmentCard";
import { AppointmentChannelEnum } from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";

const AppointmentsModule = () => {
  const appointments = createMockAppointments();

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "background.paper",
          px: 3,
          pt: 3,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={700}
          fontSize={25}
          sx={{ mb: 2.5 }}
        >
          Rezervări și abonamente
        </Typography>

        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Button variant="contained" color="primary" disableElevation>
            Rezervari
          </Button>
          <Button variant="outlined" color="secondary" disableElevation>
            Abonamente
          </Button>
        </Stack>

        <Divider sx={{ my: 2.5 }} />
      </Box>

      {appointments.map((appointment, index) => (
        <Box key={appointment.id}>
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            navigateToAppointmentDetails={(appt) =>
              console.log("Navigate to:", appt)
            }
          />

          {index < appointments.length - 1 && <Divider sx={{ my: 1.5 }} />}
        </Box>
      ))}
    </>
  );
};

export default AppointmentsModule;

export const createMockAppointments = (): Appointment[] => [
  {
    id: 1,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    channel: AppointmentChannelEnum.SCROLL_BOOKER,
    status: AppointmentStatusEnum.IN_PROGRESS,
    message: null,
    is_customer: true,
    products: [
      {
        id: 1,
        name: "Tuns",
        price: 120,
        price_with_discount: 100,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 100,
        exchange_rate: 1,
      },
      {
        id: 2,
        name: "Aranjat barbă",
        price: 80,
        price_with_discount: 60,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 60,
        exchange_rate: 1,
      },
    ],
    user: {
      id: 10,
      fullname: "Andrei Popescu",
      username: "andrei.barber",
      avatar: "https://i.pravatar.cc/150?img=12",
      profession: "Barber",
      ratings_average: 4.8,
      ratings_count: 124,
    },
    customer: {
      id: 20,
      fullname: "Radu Balgiu",
      username: "radu",
      avatar: "https://i.pravatar.cc/150?img=3",
      profession: "Client",
      ratings_average: null,
      ratings_count: null,
    },
    business: {
      id: 2,
      address: "Calea Victoriei 20",
      formatted_address: "Calea Victoriei 20, București",
      coordinates: [26.0963, 44.4397],
      map_url: null,
    },
    total_price: 200,
    total_price_with_discount: 160,
    total_discount: 20,
    total_duration: 60,
    payment_currency: {
      id: 1,
      name: "RON",
      active: false,
      created_at: "",
      updated_at: "",
    },
    has_written_review: false,
    has_video_review: false,
    written_review: {
      id: 1,
      review: "",
      rating: 0,
    },
  },
  {
    id: 2,
    start_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    channel: AppointmentChannelEnum.SCROLL_BOOKER,
    status: AppointmentStatusEnum.FINISHED,
    message: "Please arrive 5 minutes earlier",
    is_customer: true,
    products: [
      {
        id: 3,
        name: "Tuns modern",
        price: 150,
        price_with_discount: 150,
        duration: 45,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 150,
        exchange_rate: 1,
      },
    ],
    user: {
      id: 11,
      fullname: "Alex Ionescu",
      username: "alex.stylist",
      avatar: "https://i.pravatar.cc/150?img=5",
      profession: "Hair Stylist",
      ratings_average: 4.5,
      ratings_count: 72,
    },
    customer: {
      id: 20,
      fullname: "Radu Balgiu",
      username: "radu",
      avatar: "https://i.pravatar.cc/150?img=3",
      profession: "Client",
      ratings_average: null,
      ratings_count: null,
    },
    business: {
      id: 3,
      address: "Bd. Unirii 12",
      formatted_address: "Bd. Unirii 12, București",
      coordinates: [26.1101, 44.4279],
      map_url: null,
    },
    total_price: 150,
    total_price_with_discount: 150,
    total_discount: 0,
    total_duration: 45,
    payment_currency: {
      id: 1,
      name: "RON",
      active: false,
      created_at: "",
      updated_at: "",
    },
    has_written_review: false,
    has_video_review: false,
    written_review: {
      id: 2,
      review: "",
      rating: 0,
    },
  },
  {
    id: 3,
    start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000
    ).toISOString(),
    channel: AppointmentChannelEnum.SCROLL_BOOKER,
    status: AppointmentStatusEnum.CANCELED,
    message: null,
    is_customer: false,
    products: [
      {
        id: 4,
        name: "Curățare ten",
        price: 100,
        price_with_discount: 80,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 80,
        exchange_rate: 1,
      },
    ],
    user: {
      id: 15,
      fullname: "Maria Popa",
      username: "maria.beauty",
      avatar: "https://i.pravatar.cc/150?img=9",
      profession: "Cosmetician",
      ratings_average: 4.9,
      ratings_count: 201,
    },
    customer: {
      id: 21,
      fullname: "Client Necunoscut",
      username: "client123",
      avatar: "https://i.pravatar.cc/150?img=8",
      profession: "Client",
      ratings_average: null,
      ratings_count: null,
    },
    business: {
      id: 4,
      address: "Str. Lipscani 8",
      formatted_address: "Str. Lipscani 8, București",
      coordinates: [26.1025, 44.4325],
      map_url: null,
    },
    total_price: 100,
    total_price_with_discount: 80,
    total_discount: 20,
    total_duration: 30,
    payment_currency: {
      id: 1,
      name: "RON",
      active: false,
      created_at: "",
      updated_at: "",
    },
    has_written_review: false,
    has_video_review: false,
    written_review: {
      id: 3,
      review: "",
      rating: 0,
    },
  },
  {
    id: 4,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    channel: AppointmentChannelEnum.SCROLL_BOOKER,
    status: AppointmentStatusEnum.FINISHED,
    message: null,
    is_customer: true,
    products: [
      {
        id: 1,
        name: "Tuns",
        price: 120,
        price_with_discount: 100,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 100,
        exchange_rate: 1,
      },
      {
        id: 2,
        name: "Aranjat barbă",
        price: 80,
        price_with_discount: 60,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 60,
        exchange_rate: 1,
      },
    ],
    user: {
      id: 10,
      fullname: "Andrei Popescu",
      username: "andrei.barber",
      avatar: "https://i.pravatar.cc/150?img=12",
      profession: "Barber",
      ratings_average: 4.8,
      ratings_count: 124,
    },
    customer: {
      id: 20,
      fullname: "Radu Balgiu",
      username: "radu",
      avatar: "https://i.pravatar.cc/150?img=3",
      profession: "Client",
      ratings_average: null,
      ratings_count: null,
    },
    business: {
      id: 2,
      address: "Calea Victoriei 20",
      formatted_address: "Calea Victoriei 20, București",
      coordinates: [26.0963, 44.4397],
      map_url: null,
    },
    total_price: 200,
    total_price_with_discount: 160,
    total_discount: 20,
    total_duration: 60,
    payment_currency: {
      id: 1,
      name: "RON",
      active: false,
      created_at: "",
      updated_at: "",
    },
    has_written_review: false,
    has_video_review: false,
    written_review: {
      id: 1,
      review: "",
      rating: 0,
    },
  },
  {
    id: 5,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    channel: AppointmentChannelEnum.SCROLL_BOOKER,
    status: AppointmentStatusEnum.FINISHED,
    message: null,
    is_customer: true,
    products: [
      {
        id: 1,
        name: "Tuns",
        price: 120,
        price_with_discount: 100,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 100,
        exchange_rate: 1,
      },
      {
        id: 2,
        name: "Aranjat barbă",
        price: 80,
        price_with_discount: 60,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 60,
        exchange_rate: 1,
      },
    ],
    user: {
      id: 10,
      fullname: "Andrei Popescu",
      username: "andrei.barber",
      avatar: "https://i.pravatar.cc/150?img=12",
      profession: "Barber",
      ratings_average: 4.8,
      ratings_count: 124,
    },
    customer: {
      id: 20,
      fullname: "Radu Balgiu",
      username: "radu",
      avatar: "https://i.pravatar.cc/150?img=3",
      profession: "Client",
      ratings_average: null,
      ratings_count: null,
    },
    business: {
      id: 2,
      address: "Calea Victoriei 20",
      formatted_address: "Calea Victoriei 20, București",
      coordinates: [26.0963, 44.4397],
      map_url: null,
    },
    total_price: 200,
    total_price_with_discount: 160,
    total_discount: 20,
    total_duration: 60,
    payment_currency: {
      id: 1,
      name: "RON",
      active: false,
      created_at: "",
      updated_at: "",
    },
    has_written_review: false,
    has_video_review: false,
    written_review: {
      id: 1,
      review: "",
      rating: 0,
    },
  },
  {
    id: 6,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    channel: AppointmentChannelEnum.SCROLL_BOOKER,
    status: AppointmentStatusEnum.FINISHED,
    message: null,
    is_customer: true,
    products: [
      {
        id: 1,
        name: "Tuns",
        price: 120,
        price_with_discount: 100,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 100,
        exchange_rate: 1,
      },
      {
        id: 2,
        name: "Aranjat barbă",
        price: 80,
        price_with_discount: 60,
        duration: 30,
        currency: {
          id: 1,
          name: "RON",
          active: false,
          created_at: "",
          updated_at: "",
        },
        converted_price_with_discount: 60,
        exchange_rate: 1,
      },
    ],
    user: {
      id: 10,
      fullname: "Andrei Popescu",
      username: "andrei.barber",
      avatar: "https://i.pravatar.cc/150?img=12",
      profession: "Barber",
      ratings_average: 4.8,
      ratings_count: 124,
    },
    customer: {
      id: 20,
      fullname: "Radu Balgiu",
      username: "radu",
      avatar: "https://i.pravatar.cc/150?img=3",
      profession: "Client",
      ratings_average: null,
      ratings_count: null,
    },
    business: {
      id: 2,
      address: "Calea Victoriei 20",
      formatted_address: "Calea Victoriei 20, București",
      coordinates: [26.0963, 44.4397],
      map_url: null,
    },
    total_price: 200,
    total_price_with_discount: 160,
    total_discount: 20,
    total_duration: 60,
    payment_currency: {
      id: 1,
      name: "RON",
      active: false,
      created_at: "",
      updated_at: "",
    },
    has_written_review: false,
    has_video_review: false,
    written_review: {
      id: 1,
      review: "",
      rating: 0,
    },
  },
];
