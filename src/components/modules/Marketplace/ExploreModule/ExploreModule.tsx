"use client";

import { Box } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import PostOverlay from "./PostOverlay";
import PostActions from "./PostActions";
import { VideoPlayer } from "./VideoPlayer";
import { Post } from "@/ts/models/social/Post";
import { PaginatedData } from "@/components/core/Table/Table";
import ExploreSidebar from "./ExploreSidebar";
import ExploreControls from "./ExploreControls";

const MOCK_POSTS: PaginatedData<Post> = {
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

const WINDOW_SIZE = 5;

export default function ExploreModule() {
  const posts = MOCK_POSTS.results;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPost: Post | undefined = posts[currentIndex];
  const currentVideoUrl = currentPost?.media_files[0]?.url || "";

  const { user_actions, counters, user, description, is_video_review } =
    currentPost || {};

  // Sliding Window Logic: We want to keep a window of posts around the current index to ensure smooth transitions and preloading.
  const visibleWindow = useMemo(() => {
    const half = Math.floor(WINDOW_SIZE / 2);

    let start = Math.max(0, currentIndex - half);
    let end = Math.min(posts.length, start + WINDOW_SIZE);

    if (end === posts.length) {
      start = Math.max(0, end - WINDOW_SIZE);
    }

    return posts.slice(start, end);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < MOCK_POSTS.results.length - 1)
      setCurrentIndex((prev) => prev + 1);
  }, [currentIndex]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  }, [currentIndex]);

  const styles = {
    container: {
      display: "flex",
      alignItems: "stretch",
      justifyContent: "flex-end",
      gap: 3,
      width: "100%",
      height: "calc(100vh - 40px)",
      mx: "auto",
      px: 3,
      overflow: "hidden",
    },
  };

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          flex: "0 0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            aspectRatio: "9 / 16",
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "black",
          }}
        >
          {currentVideoUrl && (
            <VideoPlayer
              key={currentPost?.id}
              src={currentVideoUrl}
              isActive={true}
            />
          )}

          {visibleWindow.map((post) => {
            const url = post.media_files?.[0]?.url;

            return (
              <video
                key={post.id}
                src={url}
                preload="auto"
                style={{ display: "none" }}
              />
            );
          })}

          {user && (
            <PostOverlay
              user={user}
              description={description ?? ""}
              isVideoReview={is_video_review}
            />
          )}
        </Box>

        {user && counters && user_actions && (
          <PostActions
            user={user}
            counters={counters}
            userActions={user_actions}
          />
        )}
      </Box>

      <ExploreSidebar />

      <ExploreControls
        isDisabledPrev={currentIndex === 0}
        isDisabledNext={currentIndex === MOCK_POSTS.results.length - 1}
        onGoToPrev={goToPrev}
        onGoToNext={goToNext}
      />
    </Box>
  );
}
