"use client";

//import CustomTabs from "@/components/core/CustomTabs/CustomTabs";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const MOCK_POSTS = {
  count: 39,
  results: [
    {
      id: 59,
      description:
        "Am optat pentru folie PPF de la Upstage Detailing. Cei de acolo au lucrat exceptional iar masina mea este acum protejata. \n\nVa recomand tututor serviicile acestora.",
      user: {
        id: 294,
        fullname: "Dan Negru",
        username: "dan_negru",
        profession: "Creator",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/294/f409fd0c9df54d2f82ccefbc457e83d9.jpg",
        is_follow: true,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 292,
        fullname: "Upstage Detailing",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/292/33999a93eced41de843b5bf927fe82f3.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 1,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/4bc41a470696f26cedbff66448faae74/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/4bc41a470696f26cedbff66448faae74/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 50,
          post_id: 59,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 100,
      is_video_review: true,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-07T13:03:47.265233Z",
    },
    {
      id: 58,
      description:
        "Ce este regenerarea foliei PPF si cateva recomandari si indicii.",
      user: {
        id: 292,
        fullname: "Upstage Detailing",
        username: "upstage_detailing",
        profession: "Centru detailing auto",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/292/33999a93eced41de843b5bf927fe82f3.jpg",
        is_follow: true,
        ratings_average: 5.0,
        ratings_count: 1,
      },
      business_owner: {
        id: 292,
        fullname: "Upstage Detailing",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/292/33999a93eced41de843b5bf927fe82f3.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 0,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/fe03cda16acc49b2c7d48223e6e4b494/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/fe03cda16acc49b2c7d48223e6e4b494/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 49,
          post_id: 58,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 100,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-07T12:38:24.843029Z",
    },
    {
      id: 57,
      description:
        "Am fost sa ma tund la Frizeria Figaro. A fost o experienta chiar misto",
      user: {
        id: 220,
        fullname: "Marcel Iordache",
        username: "marcel_iordache",
        profession: "Creator",
        avatar: null,
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 12,
        fullname: "Frizeria Figaro",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/12/58a3ec8be7a5458faa3fb88041cc8731.jpg",
        ratings_average: 5.0,
      },
      employee: {
        id: 13,
        fullname: "Radu Ion",
        avatar: "https://media.scrollbooker.ro/avatar-male-17.jpg",
      },
      counters: {
        comment_count: 0,
        like_count: 0,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/1d9cc0dbd6b61d5827b8cedd351f6eba/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/1d9cc0dbd6b61d5827b8cedd351f6eba/thumbnails/thumbnail.jpg",
          duration: 53.7,
          id: 48,
          post_id: 57,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 10,
        name: "Standard",
      },
      hashtags: [],
      business_id: 7,
      is_video_review: true,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-07T10:17:02.962430Z",
    },
    {
      id: 56,
      description: "Ce coafuri se poarta in 2025?",
      user: {
        id: 290,
        fullname: "The Clique Hair Salon",
        username: "clique_hairstudio",
        profession: "Salon de înfrumusețare",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/290/7797bbd4d87740d0b69764031b12b98f.jpg",
        is_follow: true,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 290,
        fullname: "The Clique Hair Salon",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/290/7797bbd4d87740d0b69764031b12b98f.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 1,
        bookmark_count: 1,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/ae64b351005fb17dbfc6b4b91ef5a504/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/ae64b351005fb17dbfc6b4b91ef5a504/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 47,
          post_id: 56,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: true,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 99,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-07T09:51:27.306873Z",
    },
    {
      id: 55,
      description:
        "Multi dintre noi ajungem sa ignoram semnalele corpului pana cand apar durerile.",
      user: {
        id: 288,
        fullname: "Lotus Chinese Therapy",
        username: "lotus_chinese_therapy",
        profession: "Clinică de recuperare și terapie",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/288/8a3c968696184df1bdc3407c4628f492.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 286,
        fullname: "Luxe Reshape",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/286/84a193ca0a86496290bb6ba5b0236073.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 1,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/48d70d6bd99c199352836fe156e5be63/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/48d70d6bd99c199352836fe156e5be63/thumbnails/thumbnail.jpg",
          duration: 109.73,
          id: 46,
          post_id: 55,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 94,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-06T22:29:32.261247Z",
    },
    {
      id: 54,
      description: "Masaj anticelulitic cu tehnici specializate",
      user: {
        id: 287,
        fullname: "Breeze Luxury Spa",
        username: "breeze_luxury_spa",
        profession: "Salon de masaj & spa",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/287/2b156eeaf6c54c04b959de8649453556.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 286,
        fullname: "Luxe Reshape",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/286/84a193ca0a86496290bb6ba5b0236073.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 0,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/2f26476e65c824f1306e8478793bfd6b/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/2f26476e65c824f1306e8478793bfd6b/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 45,
          post_id: 54,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 94,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-06T21:32:19.371787Z",
    },
    {
      id: 53,
      description:
        "Am facut pentru prima oara Dermapen si vreau sa iti arat cum arata tenul meu la 3 saptamani de la procedura",
      user: {
        id: 233,
        fullname: "Georgiana Bilcu",
        username: "georgiana_bilcu",
        profession: "Creator",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/233/d395ab14140341508b638324b495ae63.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 286,
        fullname: "Luxe Reshape",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/286/84a193ca0a86496290bb6ba5b0236073.jpg",
        ratings_average: 5.0,
      },
      employee: {
        id: 100,
        fullname: "Laura Mihailescu",
        avatar: null,
      },
      counters: {
        comment_count: 0,
        like_count: 1,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/3a1d81e39fff6e34b0116d64504ee7ac/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/3a1d81e39fff6e34b0116d64504ee7ac/thumbnails/thumbnail.jpg",
          duration: 74.3,
          id: 44,
          post_id: 53,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 94,
      is_video_review: true,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-03T17:38:20.235204Z",
    },
    {
      id: 52,
      description: "Cum functioneaza procedura HIFU?",
      user: {
        id: 100,
        fullname: "Laura Mihailescu",
        username: "laura_mihailescu",
        profession: "Specialist remodelare corporală",
        avatar: null,
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 286,
        fullname: "Luxe Reshape",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/286/84a193ca0a86496290bb6ba5b0236073.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 2,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/60a4aced01bbdf1d1ce07a5dc4f70401/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/60a4aced01bbdf1d1ce07a5dc4f70401/thumbnails/thumbnail.jpg",
          duration: 16.9,
          id: 43,
          post_id: 52,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 94,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-03T17:11:41.145764Z",
    },
    {
      id: 51,
      description: "Tu ce procedura ai face?",
      user: {
        id: 286,
        fullname: "Luxe Reshape",
        username: "luxe_reshape",
        profession: "Centru de remodelare corporală",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/286/84a193ca0a86496290bb6ba5b0236073.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 286,
        fullname: "Luxe Reshape",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/286/84a193ca0a86496290bb6ba5b0236073.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 2,
        bookmark_count: 0,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/ac8849bb9e4f2d9e4b99390ad5ff2a24/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/ac8849bb9e4f2d9e4b99390ad5ff2a24/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 42,
          post_id: 51,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 94,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-02-03T11:03:42.370913Z",
    },
    {
      id: 50,
      description:
        "Doua cuvinte care iti pot schimba perspectiva. Totul trece.",
      user: {
        id: 285,
        fullname: "Cab Individual Lavinia Voicu",
        username: "lavinia_voicu_psihoterapeut",
        profession: "Cabinet psihologic",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/285/a4cdaa0ec0cc49cc942a2b10c9159a37.jpg",
        is_follow: true,
        ratings_average: 5.0,
        ratings_count: 1,
      },
      business_owner: {
        id: 285,
        fullname: "Cab Individual Lavinia Voicu",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/285/a4cdaa0ec0cc49cc942a2b10c9159a37.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 1,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/efe295feba7ac3516a65ce0df3157c97/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/efe295feba7ac3516a65ce0df3157c97/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 41,
          post_id: 50,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: true,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 93,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-01-30T12:40:38.381868Z",
    },
    {
      id: 47,
      description: "Full PPF with XPEL Ultimate Fusion for this beauty.",
      user: {
        id: 277,
        fullname: "Enzo Detailing",
        username: "enzo_detailing",
        profession: "Centru detailing auto",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/277/762fc232358641c197abcd76228fbce1.jpg",
        is_follow: true,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 277,
        fullname: "Enzo Detailing",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/277/762fc232358641c197abcd76228fbce1.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 0,
        bookmark_count: 3,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/67840ff8a72ed9acc3ef853bddd5d357/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/67840ff8a72ed9acc3ef853bddd5d357/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 38,
          post_id: 47,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: true,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 89,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-01-22T19:07:27.949946Z",
    },
    {
      id: 46,
      description: "Micul liliac a revenit la cabinetul nostru ..",
      user: {
        id: 271,
        fullname: "Puricel Vet",
        username: "puricel_vet",
        profession: "Cabinet veterinar",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/271/6bfebfdebe4a4f75abd124a1f5d7b7eb.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 2,
      },
      business_owner: {
        id: 271,
        fullname: "Puricel Vet",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/271/6bfebfdebe4a4f75abd124a1f5d7b7eb.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 3,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/7a5494985f6ea7b021490eef07fe141b/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/7a5494985f6ea7b021490eef07fe141b/thumbnails/thumbnail.jpg",
          duration: 31.41,
          id: 37,
          post_id: 46,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 83,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-01-19T20:57:01.502411Z",
    },
    {
      id: 45,
      description: "Ce parere ai? Ar trebui sa traca ITP-ul masina asta?",
      user: {
        id: 264,
        fullname: "Ad Premium Service",
        username: "adpremium_service",
        profession: "Stație ITP",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/264/c6dfe17a25b643a6b3648e7b3f474426.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 264,
        fullname: "Ad Premium Service",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/264/c6dfe17a25b643a6b3648e7b3f474426.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 5,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/a405c0e44eaf17bdf8f2e4d04e93125d/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/a405c0e44eaf17bdf8f2e4d04e93125d/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 36,
          post_id: 45,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 70,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-01-09T22:40:33.331696Z",
    },
    {
      id: 44,
      description: "Intretinere oja semipermanenta la MAKO",
      user: {
        id: 210,
        fullname: "Claudia Muresan",
        username: "claudia_muresan",
        profession: "Stylist",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/210/0a2b97a4fa224ebd97cb441334a7baaa.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 259,
        fullname: "Mako Salon",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/259/f953fe29dba04289a752504caa438a3b.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 4,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/0b977eba5947cff033705007a9be79a8/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/0b977eba5947cff033705007a9be79a8/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 35,
          post_id: 44,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 63,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-01-08T11:24:51.436112Z",
    },
    {
      id: 43,
      description:
        "Uneori, tot ce ai nevoie e sa te opresti putin.. si sa te gandesti la tine...",
      user: {
        id: 258,
        fullname: "Neje Spa",
        username: "neje_spa",
        profession: "Salon de masaj & spa",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/258/21a1a2080f324a94a651f7dc511b9e1f.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 258,
        fullname: "Neje Spa",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/258/21a1a2080f324a94a651f7dc511b9e1f.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 1,
        like_count: 5,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/f6c60dc511e6cdca9bcdce45e0cef9ea/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/f6c60dc511e6cdca9bcdce45e0cef9ea/thumbnails/thumbnail.jpg",
          duration: 20.07,
          id: 34,
          post_id: 43,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 62,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2026-01-07T22:16:20.473287Z",
    },
    {
      id: 41,
      description: "Tipuri de aparate dentare ",
      user: {
        id: 72,
        fullname: "A&A Dent",
        username: "aa_dent",
        profession: "Cabinet Stomatologic",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/72/7b2cfc14f6934027841846aed44069b6.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 72,
        fullname: "A&A Dent",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/72/7b2cfc14f6934027841846aed44069b6.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 7,
        bookmark_count: 3,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/e9ca71cbd90b79db4f15b42b9ffa3614/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/e9ca71cbd90b79db4f15b42b9ffa3614/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 32,
          post_id: 41,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: true,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 29,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2025-12-24T09:07:15.905888Z",
    },
    {
      id: 40,
      description: "Ce trebuie sa stii despre regie proprie.",
      user: {
        id: 251,
        fullname: "AutoCar Service Auto Militari",
        username: "autocar_service_militari",
        profession: "Service auto",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/251/49cff30fa0724163a72f21d1c28d8e3c.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 251,
        fullname: "AutoCar Service Auto Militari",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/251/49cff30fa0724163a72f21d1c28d8e3c.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 4,
        bookmark_count: 3,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/2a2aa3f175be39436925f3deb9d0ffc8/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/2a2aa3f175be39436925f3deb9d0ffc8/thumbnails/thumbnail.jpg",
          duration: 44.12,
          id: 31,
          post_id: 40,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: true,
      },
      plan: {
        id: 10,
        name: "Standard",
      },
      hashtags: [],
      business_id: 50,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2025-12-23T11:15:59.356169Z",
    },
    {
      id: 37,
      description: "Ce legume sunt interzise cainilor",
      user: {
        id: 253,
        fullname: "Cherry Vet Center",
        username: "cherry_vet_center",
        profession: "Cabinet veterinar",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/253/8986a097315f4e5296c16ef45ed946b7.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 253,
        fullname: "Cherry Vet Center",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/253/8986a097315f4e5296c16ef45ed946b7.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 2,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/9376ec7537da8e358e4fb30ecd93054e/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/9376ec7537da8e358e4fb30ecd93054e/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 28,
          post_id: 37,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 52,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2025-12-23T09:35:32.318172Z",
    },
    {
      id: 36,
      description: "Masina nu mai trage? Poate fi geometria variabila blocata.",
      user: {
        id: 252,
        fullname: "Turbolider Bucuresti",
        username: "turbolider",
        profession: "Service auto",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/252/be76691d937649d9a8d2f04865a398d8.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 252,
        fullname: "Turbolider Bucuresti",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/252/be76691d937649d9a8d2f04865a398d8.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 7,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/a119822b47f845c7225ee445f65a4736/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/a119822b47f845c7225ee445f65a4736/thumbnails/thumbnail.jpg",
          duration: 45.04,
          id: 27,
          post_id: 36,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: true,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 9,
        name: "Free",
      },
      hashtags: [],
      business_id: 51,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2025-12-23T08:29:12.104901Z",
    },
    {
      id: 35,
      description:
        "A venit la noi in service un tanar de 21 de ani si parintii lui nu stiau nimic",
      user: {
        id: 251,
        fullname: "AutoCar Service Auto Militari",
        username: "autocar_service_militari",
        profession: "Service auto",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/251/49cff30fa0724163a72f21d1c28d8e3c.jpg",
        is_follow: false,
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_owner: {
        id: 251,
        fullname: "AutoCar Service Auto Militari",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/251/49cff30fa0724163a72f21d1c28d8e3c.jpg",
        ratings_average: 5.0,
      },
      employee: null,
      counters: {
        comment_count: 0,
        like_count: 0,
        bookmark_count: 2,
        repost_count: 0,
        bookings_count: 0,
        views_count: 0,
      },
      media_files: [
        {
          url: "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/361775a9649409a94dc91f5d21e5b441/manifest/video.m3u8",
          type: "video",
          thumbnail_url:
            "https://customer-6cxd9cbmk3dgbkpb.cloudflarestream.com/361775a9649409a94dc91f5d21e5b441/thumbnails/thumbnail.jpg",
          duration: -1.0,
          id: 26,
          post_id: 35,
          order_index: 0,
        },
      ],
      user_actions: {
        is_liked: false,
        is_reposted: false,
        is_bookmarked: false,
      },
      plan: {
        id: 10,
        name: "Standard",
      },
      hashtags: [],
      business_id: 50,
      is_video_review: false,
      is_own_post: false,
      rating: null,
      bookable: true,
      last_minute: {
        is_last_minute: false,
        last_minute_end: null,
        has_fixed_slots: false,
        fixed_slots: null,
      },
      created_at: "2025-12-23T08:10:42.411892Z",
    },
  ],
};

const SERVICES = [
  {
    name: "Tuns + barba",
    duration: "45 min",
    price: "de la 90 RON",
    highlight: true,
  },
  {
    name: "Fade premium",
    duration: "60 min",
    price: "120 RON",
  },
  {
    name: "Pachet styling event",
    duration: "75 min",
    price: "160 RON",
  },
];

const PRODUCTS = [
  {
    name: "Matte clay",
    type: "Styling",
    price: "69 RON",
  },
  {
    name: "Beard oil kit",
    type: "Aftercare",
    price: "84 RON",
  },
  {
    name: "Texture powder",
    type: "Finish",
    price: "58 RON",
  },
];

const REVIEWS = [
  {
    name: "Alex M.",
    rating: "5.0",
    text: "Am venit pentru clip, am rămas pentru cât de clar era tot fluxul de booking.",
  },
  {
    name: "Radu P.",
    rating: "4.9",
    text: "Disponibilitatea era exact cum apărea în feed. Foarte puține click-uri până la rezervare.",
  },
  {
    name: "Bianca T.",
    rating: "5.0",
    text: "Mi-a plăcut că am putut compara rapid serviciile fără să ies din video.",
  },
];

const COMMENTS = [
  {
    name: "cris.style",
    text: "Culoarea din clip e exact ce căutam. Se poate face booking și pentru sâmbătă?",
  },
  {
    name: "maria.looks",
    text: "Arată bine că disponibilitatea e lângă video. Nu mai trebuie să intru pe profil.",
  },
  {
    name: "vlad.cut",
    text: "Aș apăsa direct pe Rezervă dacă văd și durata serviciului în panou.",
  },
];

enum ExploreInfoTab {
  PRODUCTS,
  REVIEWS,
  COMMENTS,
}

export default function ExploreModule() {
  //const [currentTab, setCurrentTab] = React.useState(0);
  const [infoTab, setInfoTab] = React.useState(ExploreInfoTab.PRODUCTS);

  const renderRightRailContent = () => {
    switch (infoTab) {
      case ExploreInfoTab.PRODUCTS:
        return (
          <Stack spacing={1.25}>
            {PRODUCTS.map((product) => (
              <Paper
                key={product.name}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Box>
                    <Typography fontWeight={700}>{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.type}
                    </Typography>
                  </Box>
                  <Typography fontWeight={700}>{product.price}</Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        );
      case ExploreInfoTab.REVIEWS:
        return (
          <Stack spacing={1.25}>
            {REVIEWS.map((review) => (
              <Paper
                key={review.name}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={700}>{review.name}</Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <StarRoundedIcon
                      sx={{ fontSize: 18, color: "primary.main" }}
                    />
                    <Typography variant="body2" fontWeight={700}>
                      {review.rating}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {review.text}
                </Typography>
              </Paper>
            ))}
          </Stack>
        );
      case ExploreInfoTab.COMMENTS:
        return (
          <Stack spacing={1.25}>
            {COMMENTS.map((comment) => (
              <Paper
                key={comment.name}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Typography fontWeight={700}>{comment.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.75 }}
                >
                  {comment.text}
                </Typography>
              </Paper>
            ))}
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* <CustomTabs
				tabs={[
					{ label: "Explore", key: 0 },
					{ label: "Urmaresti", key: 1 },
				]}
				currentTab={currentTab}
				setValue={setCurrentTab}
			/> */}

      <Container
        sx={{
          py: { xs: 2, md: 3, lg: 0 },
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, md: 3 },
          height: { lg: "calc(100dvh - 40px)" },
          maxHeight: { lg: "calc(100dvh - 40px)" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-end", lg: "stretch" },
            gap: { xs: 1.5, lg: 3 },
            flexDirection: { xs: "row", lg: "row" },
            width: "100%",
            maxWidth: 1280,
            justifyContent: "center",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              width: { xs: "100%", lg: "auto" },
              maxWidth: { xs: 340, sm: 370, md: 420, lg: "none" },
              flexShrink: 0,
              height: { lg: "100%" },
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                /* height-driven: lățimea se calculează din height × 9/16 */
                height: { xs: "auto", lg: "100%" },
                width: { xs: "100%", lg: "auto" },
                aspectRatio: "9 / 16",
                borderRadius: 6,
                overflow: "hidden",
                bgcolor: "secondary.main",
                boxShadow: "0 28px 60px rgba(15, 23, 42, 0.28)",
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at top, rgba(255,255,255,0.14), transparent 35%), linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.65) 100%)",
                }}
              />

              <Stack
                spacing={1.5}
                sx={{
                  position: "absolute",
                  left: 20,
                  right: 20,
                  bottom: 20,
                  zIndex: 1,
                  color: "common.white",
                }}
              >
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Box>
                    <Typography variant="subtitle1" fontWeight={800}>
                      Frizeria Figaro
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ opacity: 0.92, fontWeight: 600 }}
                    >
                      Frizerie
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, maxWidth: 320 }}
                >
                  Un video trebuie să convingă vizual. Panoul din dreapta
                  trebuie să închidă rapid decizia de rezervare.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    display: { xs: "inline-flex", lg: "none" },
                    alignSelf: "flex-start",
                    px: 2.5,
                  }}
                >
                  Rezervă
                </Button>
              </Stack>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              pb: 1,
              alignSelf: { xs: "flex-end", lg: "flex-end" },
            }}
          >
            {[
              {
                key: "like",
                icon: <FavoriteIcon fontSize="large" />,
              },
              {
                key: "comments",
                icon: <TextsmsIcon fontSize="large" />,
              },
              {
                key: "save",
                icon: <BookmarkIcon fontSize="large" />,
              },
              { key: "share", icon: <ShareRoundedIcon fontSize="large" /> },
            ].map((action) => (
              <Box
                key={action.key}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: "rgba(15,23,42,0.72)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "common.white",
                  cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(15,23,42,0.16)",
                }}
              >
                {action.icon}
              </Box>
            ))}
          </Box>

          <Paper
            elevation={0}
            sx={{
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              width: 420,
              height: "100%",
              minHeight: 0,
              borderRadius: 6,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: "background.default",
              overflow: "hidden",
              boxShadow: "0 28px 60px rgba(15, 23, 42, 0.08)",
            }}
          >
            <Box
              sx={{
                p: 2,
                background:
                  "linear-gradient(180deg, rgba(255,111,0,0.10) 0%, rgba(255,111,0,0) 100%)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Box>
                  <Typography
                    variant="overline"
                    color="primary.main"
                    fontWeight={800}
                  >
                    BOOKING PANEL
                  </Typography>
                  <Typography variant="h6" fontWeight={800} sx={{ mt: 0.5 }}>
                    Rezervă fără să părăsești feed-ul
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Toate informațiile esențiale pentru decizie sunt lângă
                    video: servicii, durată, preț și primul slot disponibil.
                  </Typography>
                </Box>
                <Chip label="4.9" color="primary" icon={<StarRoundedIcon />} />
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 1.5 }}
              >
                <Chip
                  icon={<PlaceRoundedIcon />}
                  label="Piața Romană, București"
                />
                <Chip
                  icon={<AccessTimeRoundedIcon />}
                  label="Azi, 17:30 disponibil"
                />
                <Chip label="de la 90 RON" />
              </Stack>
            </Box>

            <Box sx={{ px: 2, pb: 2 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: 4,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Stack spacing={1.25}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight={800}>
                      Pasul 1 • Alege serviciile
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2 din 3 pași rămași
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    {SERVICES.map((service) => (
                      <Paper
                        key={service.name}
                        variant="outlined"
                        sx={{
                          p: 1.25,
                          borderRadius: 3,
                          borderColor: service.highlight
                            ? "primary.main"
                            : "divider",
                          bgcolor: service.highlight
                            ? "rgba(255,111,0,0.06)"
                            : "background.paper",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Box>
                            <Typography fontWeight={700}>
                              {service.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.4 }}
                            >
                              {service.duration}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: "right" }}>
                            <Typography fontWeight={800}>
                              {service.price}
                            </Typography>
                            {service.highlight ? (
                              <Typography
                                variant="caption"
                                color="primary.main"
                                fontWeight={700}
                              >
                                Selectat în mock
                              </Typography>
                            ) : null}
                          </Box>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderRadius: 3,
                      borderColor: "divider",
                      bgcolor: "background.default",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Selecție curentă
                        </Typography>
                        <Typography fontWeight={800}>Tuns + barba</Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography fontWeight={800}>90 RON</Typography>
                        <Typography variant="body2" color="text.secondary">
                          45 min
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="medium"
                      endIcon={<ArrowForwardRoundedIcon />}
                    >
                      Alege disponibilitatea
                    </Button>
                    <Button fullWidth variant="outlined" size="medium">
                      Confirmă pașii
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Box>

            <Divider />

            <Box sx={{ px: 1.25, pt: 1.25 }}>
              <Tabs
                value={infoTab}
                onChange={(_, value) => setInfoTab(value)}
                variant="fullWidth"
                sx={{
                  minHeight: 44,
                  "& .MuiTabs-indicator": { height: 3, borderRadius: 3 },
                  "& .MuiTab-root": {
                    textTransform: "none",
                    minHeight: 44,
                    fontWeight: 700,
                  },
                }}
              >
                <Tab value={ExploreInfoTab.PRODUCTS} label="Produse" />
                <Tab value={ExploreInfoTab.REVIEWS} label="Recenzii" />
                <Tab value={ExploreInfoTab.COMMENTS} label="Comentarii" />
              </Tabs>
            </Box>

            <Box
              sx={{ flex: 1, minHeight: 0, p: 2, pt: 1.5, overflowY: "auto" }}
            >
              {renderRightRailContent()}
            </Box>

            <Box
              sx={{
                mt: "auto",
                p: 1.5,
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                bgcolor: "background.paper",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Rezervare selectată
                  </Typography>
                  <Typography fontWeight={800}>
                    Tuns + barba • azi 17:30
                  </Typography>
                </Box>
                <Button variant="contained" size="medium">
                  Rezervă acum
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
