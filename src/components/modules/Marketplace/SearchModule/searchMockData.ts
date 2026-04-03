import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessMarker } from "@/ts/models/booking/business/search/BusinessMarker";
import { BusinessSheet } from "@/ts/models/booking/business/search/BusinessSheet";

export const markers: BusinessMarker[] = [
  {
    id: 100,
    owner: {
      id: 292,
      fullname: "Upstage Detailing",
      username: "upstage_detailing",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/292/33999a93eced41de843b5bf927fe82f3.jpg",
      profession: "Centru detailing auto",
      ratings_average: 5.0,
      ratings_count: 1,
    },
    business_type: "Centru detailing auto",
    business_short_domain: "Auto",
    address: "Bulevardul Ion Ionescu de la Brad 6, București, România",
    coordinates: {
      lat: 44.50007710000001,
      lng: 26.0698212,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/100/photo/00_card_f1aa7a7b8a404de98e8724cc437752b5.jpg",
        url_key:
          "businesses/100/photo/00_card_f1aa7a7b8a404de98e8724cc437752b5.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/100/photo/00_thumb_b32283be62384db0a7d3cd87a33f4b28.jpg",
        thumbnail_key:
          "businesses/100/photo/00_thumb_b32283be62384db0a7d3cd87a33f4b28.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/100/photo/01_card_425b07456f6f48798fa3ed4425e8e1a4.jpg",
        url_key:
          "businesses/100/photo/01_card_425b07456f6f48798fa3ed4425e8e1a4.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/100/photo/01_thumb_5da33293ea0846d481c4af481c26a315.jpg",
        thumbnail_key:
          "businesses/100/photo/01_thumb_5da33293ea0846d481c4af481c26a315.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/100/photo/02_card_b386ffc322584116b4e2a628b0904ffd.jpg",
        url_key:
          "businesses/100/photo/02_card_b386ffc322584116b4e2a628b0904ffd.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/100/photo/02_thumb_83c0fb2260c94de7826c10aac084de27.jpg",
        thumbnail_key:
          "businesses/100/photo/02_thumb_83c0fb2260c94de7826c10aac084de27.jpg",
        type: "photo",
        order_index: 2,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 9,
    owner: {
      id: 19,
      fullname: "ITP Militari Residence",
      username: "itp_militari_residence",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/19/06dd7414c598422caed5aacd196f78a9.jpg",
      profession: "Stație ITP",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Stație ITP",
    business_short_domain: "Auto",
    address: "Str. Rezervelor 21, Chiajna 077042, România",
    coordinates: {
      lat: 44.4506854,
      lng: 25.9932733,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/9/photo/00_card_a2f97b8c793946be9d6665fa738a6a79.jpg",
        url_key:
          "businesses/9/photo/00_card_a2f97b8c793946be9d6665fa738a6a79.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/9/photo/00_thumb_feaf91792d1e4b08bebcfc1547bb559e.jpg",
        thumbnail_key:
          "businesses/9/photo/00_thumb_feaf91792d1e4b08bebcfc1547bb559e.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/9/photo/01_card_6896dd654e69490c92e8141653b46ee0.jpg",
        url_key:
          "businesses/9/photo/01_card_6896dd654e69490c92e8141653b46ee0.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/9/photo/01_thumb_d0ff836d63384e7cb30b0e96093967e7.jpg",
        thumbnail_key:
          "businesses/9/photo/01_thumb_d0ff836d63384e7cb30b0e96093967e7.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/9/photo/02_card_1239534533b542c988ab8b0d25c743a4.jpg",
        url_key:
          "businesses/9/photo/02_card_1239534533b542c988ab8b0d25c743a4.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/9/photo/02_thumb_c5cf689ffd884c08968c9cdebee85f72.jpg",
        thumbnail_key:
          "businesses/9/photo/02_thumb_c5cf689ffd884c08968c9cdebee85f72.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/9/photo/03_card_bd35209079be42ce8160bf8562493c14.jpg",
        url_key:
          "businesses/9/photo/03_card_bd35209079be42ce8160bf8562493c14.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/9/photo/03_thumb_1df956fe8e514204acf1808be7643529.jpg",
        thumbnail_key:
          "businesses/9/photo/03_thumb_1df956fe8e514204acf1808be7643529.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/9/photo/04_card_7c7d3c90956947a9bb08d779ae0d9e92.jpg",
        url_key:
          "businesses/9/photo/04_card_7c7d3c90956947a9bb08d779ae0d9e92.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/9/photo/04_thumb_83a21bf6548b47958f5ee15dd4b00da7.jpg",
        thumbnail_key:
          "businesses/9/photo/04_thumb_83a21bf6548b47958f5ee15dd4b00da7.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 94,
    owner: {
      id: 286,
      fullname: "Luxe Reshape",
      username: "luxe_reshape",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/286/84a193ca0a86496290bb6ba5b0236073.jpg",
      profession: "Centru de remodelare corporală",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Centru de remodelare corporală",
    business_short_domain: "Beauty",
    address: "Bulevardul Pipera 64, 077190 Voluntari, România",
    coordinates: {
      lat: 44.5108702,
      lng: 26.1393865,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/94/photo/00_card_5b587b16064542e19ae2a16b98aff4aa.jpg",
        url_key:
          "businesses/94/photo/00_card_5b587b16064542e19ae2a16b98aff4aa.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/94/photo/00_thumb_0c51e6728cb74232bf9551897fa305c1.jpg",
        thumbnail_key:
          "businesses/94/photo/00_thumb_0c51e6728cb74232bf9551897fa305c1.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/94/photo/01_card_b3d0cd00ed4d4cbb95bd374f2f011dc1.jpg",
        url_key:
          "businesses/94/photo/01_card_b3d0cd00ed4d4cbb95bd374f2f011dc1.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/94/photo/01_thumb_9ee7cb33af48456cbdc85d9ff4ef7167.jpg",
        thumbnail_key:
          "businesses/94/photo/01_thumb_9ee7cb33af48456cbdc85d9ff4ef7167.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/94/photo/02_card_359516be851d4753b9aff4cf40ac522a.jpg",
        url_key:
          "businesses/94/photo/02_card_359516be851d4753b9aff4cf40ac522a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/94/photo/02_thumb_e37904ecac894ec09dc71f618bae20a9.jpg",
        thumbnail_key:
          "businesses/94/photo/02_thumb_e37904ecac894ec09dc71f618bae20a9.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/94/photo/03_card_72a94da36be14f45ba42ce8e0fe5cea0.jpg",
        url_key:
          "businesses/94/photo/03_card_72a94da36be14f45ba42ce8e0fe5cea0.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/94/photo/03_thumb_fd049e70c58d455b831d1a0abc0609be.jpg",
        thumbnail_key:
          "businesses/94/photo/03_thumb_fd049e70c58d455b831d1a0abc0609be.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/94/photo/04_card_d46ae44654f446f58f61a1b46e60a0f9.jpg",
        url_key:
          "businesses/94/photo/04_card_d46ae44654f446f58f61a1b46e60a0f9.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/94/photo/04_thumb_bdf26c2cf31649fabab7220a8372d9a2.jpg",
        thumbnail_key:
          "businesses/94/photo/04_thumb_bdf26c2cf31649fabab7220a8372d9a2.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 8,
    owner: {
      id: 18,
      fullname: "ITP Dristor",
      username: "itp_dristor",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/18/fa363953fdf24e0dae3502ce8f67bdf2.jpg",
      profession: "Stație ITP",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Stație ITP",
    business_short_domain: "Auto",
    address: "Str. Părului 4, București 077086, România",
    coordinates: {
      lat: 44.4690607,
      lng: 26.1744411,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/8/photo/00_card_60ad368b4e824511b4edd473792310b5.jpg",
        url_key:
          "businesses/8/photo/00_card_60ad368b4e824511b4edd473792310b5.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/8/photo/00_thumb_9f8783232df94d149eb97e66e76bd52d.jpg",
        thumbnail_key:
          "businesses/8/photo/00_thumb_9f8783232df94d149eb97e66e76bd52d.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/8/photo/01_card_ee7285421675498598bc2257c43b6deb.jpg",
        url_key:
          "businesses/8/photo/01_card_ee7285421675498598bc2257c43b6deb.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/8/photo/01_thumb_bcba4ef6396d4a42b1aac393e08eaa90.jpg",
        thumbnail_key:
          "businesses/8/photo/01_thumb_bcba4ef6396d4a42b1aac393e08eaa90.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/8/photo/02_card_421284c9806d409b8fa65f22e24e74fa.jpg",
        url_key:
          "businesses/8/photo/02_card_421284c9806d409b8fa65f22e24e74fa.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/8/photo/02_thumb_30b5bc773f74490e8f15142353ae127d.jpg",
        thumbnail_key:
          "businesses/8/photo/02_thumb_30b5bc773f74490e8f15142353ae127d.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/8/photo/03_card_96e06423f2114cbf9e19336f81015edf.jpg",
        url_key:
          "businesses/8/photo/03_card_96e06423f2114cbf9e19336f81015edf.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/8/photo/03_thumb_fcb4940be9ae4b31b36886ea9db1682e.jpg",
        thumbnail_key:
          "businesses/8/photo/03_thumb_fcb4940be9ae4b31b36886ea9db1682e.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/8/photo/04_card_28d9bd9eb6cb415295574b73d870eb2c.jpg",
        url_key:
          "businesses/8/photo/04_card_28d9bd9eb6cb415295574b73d870eb2c.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/8/photo/04_thumb_4fdc5a20411941cc9c8e1ca924cb42fb.jpg",
        thumbnail_key:
          "businesses/8/photo/04_thumb_4fdc5a20411941cc9c8e1ca924cb42fb.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 2,
    owner: {
      id: 3,
      fullname: "House of Barbers",
      username: "house_of_barbers",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/3/ec699f7d839b4465abe0201fd8fc76f9.jpg",
      profession: "Creator",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Șoseaua Iancului 46, București, România",
    coordinates: {
      lat: 44.4415635,
      lng: 26.1384693,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/2/photo/00_card_c4e0ff599fd94bf29b3915302ecb7e00.jpg",
        url_key:
          "businesses/2/photo/00_card_c4e0ff599fd94bf29b3915302ecb7e00.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/2/photo/00_thumb_bf87a72cfc4842a5bc89d952514b36c3.jpg",
        thumbnail_key:
          "businesses/2/photo/00_thumb_bf87a72cfc4842a5bc89d952514b36c3.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/2/photo/01_card_5fea9a6cd55d40dc9dce85a2028a5b94.jpg",
        url_key:
          "businesses/2/photo/01_card_5fea9a6cd55d40dc9dce85a2028a5b94.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/2/photo/01_thumb_16f482f27f34483d91ed21e3fde366e2.jpg",
        thumbnail_key:
          "businesses/2/photo/01_thumb_16f482f27f34483d91ed21e3fde366e2.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/2/photo/02_card_628797fc4fb54fbc9cd7c6a669759154.jpg",
        url_key:
          "businesses/2/photo/02_card_628797fc4fb54fbc9cd7c6a669759154.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/2/photo/02_thumb_badb7e628da0401bb5b5b16840bc2e0f.jpg",
        thumbnail_key:
          "businesses/2/photo/02_thumb_badb7e628da0401bb5b5b16840bc2e0f.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/2/photo/03_card_f3771467b1ba4642a1c83a94652c7636.jpg",
        url_key:
          "businesses/2/photo/03_card_f3771467b1ba4642a1c83a94652c7636.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/2/photo/03_thumb_849ecf5dba6548b180628d28272cbf01.jpg",
        thumbnail_key:
          "businesses/2/photo/03_thumb_849ecf5dba6548b180628d28272cbf01.jpg",
        type: "photo",
        order_index: 3,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 12,
    owner: {
      id: 29,
      fullname: "Frizerescu Barber Shop",
      username: "frizerescu_barbers_shop",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/29/e25da8856c14489a8b66ae8cb477f952.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Bulevardul Pipera 36, Voluntari 077190, România",
    coordinates: {
      lat: 44.504832,
      lng: 26.136587,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/12/photo/00_card_58638f3ab2a7456cacd2529c2f4627c6.jpg",
        url_key:
          "businesses/12/photo/00_card_58638f3ab2a7456cacd2529c2f4627c6.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/12/photo/00_thumb_3f26cbc633144f33aa9a3785ff8e9d72.jpg",
        thumbnail_key:
          "businesses/12/photo/00_thumb_3f26cbc633144f33aa9a3785ff8e9d72.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/12/photo/01_card_fba29f754593446e861376b37a0360e9.jpg",
        url_key:
          "businesses/12/photo/01_card_fba29f754593446e861376b37a0360e9.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/12/photo/01_thumb_86eb2b78f45c4878b5871e8e6cd7bec4.jpg",
        thumbnail_key:
          "businesses/12/photo/01_thumb_86eb2b78f45c4878b5871e8e6cd7bec4.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/12/photo/02_card_b54b3e9387c045ae80403a18a01e0cda.jpg",
        url_key:
          "businesses/12/photo/02_card_b54b3e9387c045ae80403a18a01e0cda.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/12/photo/02_thumb_2f42aca46a84450eb335a3e77c62812e.jpg",
        thumbnail_key:
          "businesses/12/photo/02_thumb_2f42aca46a84450eb335a3e77c62812e.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/12/photo/03_card_a3b2bc4cfebe42eb8df37affca4933c2.jpg",
        url_key:
          "businesses/12/photo/03_card_a3b2bc4cfebe42eb8df37affca4933c2.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/12/photo/03_thumb_63eb3a1082fb4b5683797d978f626287.jpg",
        thumbnail_key:
          "businesses/12/photo/03_thumb_63eb3a1082fb4b5683797d978f626287.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/12/photo/04_card_13e7989bd23c48978b6a3c89fa99d766.jpg",
        url_key:
          "businesses/12/photo/04_card_13e7989bd23c48978b6a3c89fa99d766.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/12/photo/04_thumb_d60a14d322714f63b6acc0afd65af8a2.jpg",
        thumbnail_key:
          "businesses/12/photo/04_thumb_d60a14d322714f63b6acc0afd65af8a2.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 14,
    owner: {
      id: 55,
      fullname: "Stefan Catalin Concept",
      username: "stefan_catalin_concept",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/55/c0adf585eecf44ea8453c280dafb8b1d.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Rezervelor 89, 077042 Roșu, România",
    coordinates: {
      lat: 44.4435704,
      lng: 25.9887404,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/14/photo/00_card_4f9bfae151cf44bea9793c2c08a31306.jpg",
        url_key:
          "businesses/14/photo/00_card_4f9bfae151cf44bea9793c2c08a31306.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/14/photo/00_thumb_ec723c326f2b422ba94d24bd24db53f1.jpg",
        thumbnail_key:
          "businesses/14/photo/00_thumb_ec723c326f2b422ba94d24bd24db53f1.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/14/photo/01_card_4876da9d5bf34dc7aabd73d63a275e55.jpg",
        url_key:
          "businesses/14/photo/01_card_4876da9d5bf34dc7aabd73d63a275e55.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/14/photo/01_thumb_ae5cd3f431c748cab7ae1686d6af5091.jpg",
        thumbnail_key:
          "businesses/14/photo/01_thumb_ae5cd3f431c748cab7ae1686d6af5091.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/14/photo/02_card_038aea60a9a14e31a6d29ac1b484e820.jpg",
        url_key:
          "businesses/14/photo/02_card_038aea60a9a14e31a6d29ac1b484e820.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/14/photo/02_thumb_0f1e12965eac4b79b015a29f0b1a75d0.jpg",
        thumbnail_key:
          "businesses/14/photo/02_thumb_0f1e12965eac4b79b015a29f0b1a75d0.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/14/photo/03_card_e66f1efc7d3143059c8e80464a950438.jpg",
        url_key:
          "businesses/14/photo/03_card_e66f1efc7d3143059c8e80464a950438.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/14/photo/03_thumb_35547a92205e4139ad88fb2a739dad8e.jpg",
        thumbnail_key:
          "businesses/14/photo/03_thumb_35547a92205e4139ad88fb2a739dad8e.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/14/photo/04_card_7c907ecead344eeeae2877b005c4f564.jpg",
        url_key:
          "businesses/14/photo/04_card_7c907ecead344eeeae2877b005c4f564.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/14/photo/04_thumb_ba83f7a2e0434f6bbbcaf86307598e96.jpg",
        thumbnail_key:
          "businesses/14/photo/04_thumb_ba83f7a2e0434f6bbbcaf86307598e96.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 19,
    owner: {
      id: 61,
      fullname: "Limar Auto",
      username: "limar_auto",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/61/df6ec6b742ef45b7b84ea27721b93939.jpg",
      profession: "Stație ITP",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Stație ITP",
    business_short_domain: "Auto",
    address: "Șoseaua Alexandriei 193d, București 051528, România",
    coordinates: {
      lat: 44.3957695,
      lng: 26.0385682,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/19/photo/00_card_0ce7d2e524ab433eacd0d8d7045a4afe.jpg",
        url_key:
          "businesses/19/photo/00_card_0ce7d2e524ab433eacd0d8d7045a4afe.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/19/photo/00_thumb_dd026348930c4829a4d598965cdc39bd.jpg",
        thumbnail_key:
          "businesses/19/photo/00_thumb_dd026348930c4829a4d598965cdc39bd.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/19/photo/01_card_a00e06d047aa4467a178a78357319c41.jpg",
        url_key:
          "businesses/19/photo/01_card_a00e06d047aa4467a178a78357319c41.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/19/photo/01_thumb_8c83c3c4c48049e3959256813708fa20.jpg",
        thumbnail_key:
          "businesses/19/photo/01_thumb_8c83c3c4c48049e3959256813708fa20.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/19/photo/02_card_68bc3595ca814462a615e3af1c1477b1.jpg",
        url_key:
          "businesses/19/photo/02_card_68bc3595ca814462a615e3af1c1477b1.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/19/photo/02_thumb_c5be285cdb6346a2ac8c08a79ed9eac3.jpg",
        thumbnail_key:
          "businesses/19/photo/02_thumb_c5be285cdb6346a2ac8c08a79ed9eac3.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/19/photo/03_card_2d4abf00d6a34ffab0c423e2a21ccdf9.jpg",
        url_key:
          "businesses/19/photo/03_card_2d4abf00d6a34ffab0c423e2a21ccdf9.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/19/photo/03_thumb_cf79206991c04555b2ac0945aede8c0e.jpg",
        thumbnail_key:
          "businesses/19/photo/03_thumb_cf79206991c04555b2ac0945aede8c0e.jpg",
        type: "photo",
        order_index: 3,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 20,
    owner: {
      id: 63,
      fullname: "Men Cave",
      username: "men_cave",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/63/cac95babab11453a8a40de0a91d88c2f.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Strada Comana 50, București 011274, România",
    coordinates: {
      lat: 44.45403899999999,
      lng: 26.0694871,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/20/photo/00_card_7dd6bcc9cac64bdfa853c880c1f956b5.jpg",
        url_key:
          "businesses/20/photo/00_card_7dd6bcc9cac64bdfa853c880c1f956b5.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/20/photo/00_thumb_8a9b3ec779f74e0c814dbe0aee038d75.jpg",
        thumbnail_key:
          "businesses/20/photo/00_thumb_8a9b3ec779f74e0c814dbe0aee038d75.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/20/photo/01_card_d76d312199fd4b8189c24f7e72dfcbd5.jpg",
        url_key:
          "businesses/20/photo/01_card_d76d312199fd4b8189c24f7e72dfcbd5.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/20/photo/01_thumb_4ecfe471aec34a5da17331953b9ab379.jpg",
        thumbnail_key:
          "businesses/20/photo/01_thumb_4ecfe471aec34a5da17331953b9ab379.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/20/photo/02_card_ee9cdf99f13a402ea9857fc1faf17aaf.jpg",
        url_key:
          "businesses/20/photo/02_card_ee9cdf99f13a402ea9857fc1faf17aaf.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/20/photo/02_thumb_6bd25bd989864cc693a6de49459e7cbf.jpg",
        thumbnail_key:
          "businesses/20/photo/02_thumb_6bd25bd989864cc693a6de49459e7cbf.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/20/photo/03_card_6b5f8b9ff73048c28e6468ca616cd5ec.jpg",
        url_key:
          "businesses/20/photo/03_card_6b5f8b9ff73048c28e6468ca616cd5ec.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/20/photo/03_thumb_a00cafc6b6284931bcda1a5c61ce9be1.jpg",
        thumbnail_key:
          "businesses/20/photo/03_thumb_a00cafc6b6284931bcda1a5c61ce9be1.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/20/photo/04_card_6acf29bea07243a9a7ed9ca0868970a8.jpg",
        url_key:
          "businesses/20/photo/04_card_6acf29bea07243a9a7ed9ca0868970a8.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/20/photo/04_thumb_f001f6971dd64102aee7137df5c3d9cf.jpg",
        thumbnail_key:
          "businesses/20/photo/04_thumb_f001f6971dd64102aee7137df5c3d9cf.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 95,
    owner: {
      id: 287,
      fullname: "Breeze Luxury Spa",
      username: "breeze_luxury_spa",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/287/2b156eeaf6c54c04b959de8649453556.jpg",
      profession: "Salon de masaj & spa",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Salon de masaj & spa",
    business_short_domain: "Beauty",
    address: "Strada General Eremia Grigorescu 25, 030167 București, România",
    coordinates: {
      lat: 44.4451196,
      lng: 26.1009519,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/95/photo/00_card_b2886367d1ad43769f3a69005120b7e3.jpg",
        url_key:
          "businesses/95/photo/00_card_b2886367d1ad43769f3a69005120b7e3.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/95/photo/00_thumb_008a68e4754b436ba63926679d8a4df6.jpg",
        thumbnail_key:
          "businesses/95/photo/00_thumb_008a68e4754b436ba63926679d8a4df6.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/95/photo/01_card_dc12eccae0ae4db995f6ca2f7d1f0a5d.jpg",
        url_key:
          "businesses/95/photo/01_card_dc12eccae0ae4db995f6ca2f7d1f0a5d.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/95/photo/01_thumb_c1ddbfbae3cd49aca5b39903f97b8e3e.jpg",
        thumbnail_key:
          "businesses/95/photo/01_thumb_c1ddbfbae3cd49aca5b39903f97b8e3e.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/95/photo/02_card_334dcea6fd3445ac85414904d20177f5.jpg",
        url_key:
          "businesses/95/photo/02_card_334dcea6fd3445ac85414904d20177f5.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/95/photo/02_thumb_632902b85d9b4d03aa7bf1ff29decc4b.jpg",
        thumbnail_key:
          "businesses/95/photo/02_thumb_632902b85d9b4d03aa7bf1ff29decc4b.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/95/photo/03_card_97ae8a0862e54a9f9edee60d8d741707.jpg",
        url_key:
          "businesses/95/photo/03_card_97ae8a0862e54a9f9edee60d8d741707.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/95/photo/03_thumb_2ec9fdf45f2d4150a93139eff4aff5ae.jpg",
        thumbnail_key:
          "businesses/95/photo/03_thumb_2ec9fdf45f2d4150a93139eff4aff5ae.jpg",
        type: "photo",
        order_index: 3,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 71,
    owner: {
      id: 265,
      fullname: "ITP Crangasi",
      username: "itp_crangasi",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/265/8a86e09b3cf14372a51ad7a533a27209.jpg",
      profession: "Stație ITP",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Stație ITP",
    business_short_domain: "Auto",
    address: "Strada General Petre Popovăț 17, București 060313, România",
    coordinates: {
      lat: 44.4508424,
      lng: 26.0473594,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/71/photo/00_card_5dcce361a81a4268b1df79e82eba9ff1.jpg",
        url_key:
          "businesses/71/photo/00_card_5dcce361a81a4268b1df79e82eba9ff1.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/71/photo/00_thumb_7c471104718c4d3c8a97ec6a3228d8dc.jpg",
        thumbnail_key:
          "businesses/71/photo/00_thumb_7c471104718c4d3c8a97ec6a3228d8dc.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/71/photo/01_card_4b1a11300de844608eaec7236d3c4223.jpg",
        url_key:
          "businesses/71/photo/01_card_4b1a11300de844608eaec7236d3c4223.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/71/photo/01_thumb_e8fa3bebf1d2414d8b33b972708eacaa.jpg",
        thumbnail_key:
          "businesses/71/photo/01_thumb_e8fa3bebf1d2414d8b33b972708eacaa.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/71/photo/02_card_5ac1d6f7503f423a8f485b9af70858d5.jpg",
        url_key:
          "businesses/71/photo/02_card_5ac1d6f7503f423a8f485b9af70858d5.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/71/photo/02_thumb_4a36a97542cb4e0a99392e2c6cb22e59.jpg",
        thumbnail_key:
          "businesses/71/photo/02_thumb_4a36a97542cb4e0a99392e2c6cb22e59.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/71/photo/03_card_d13368da2d0349a5ba1ee158cff80a9d.jpg",
        url_key:
          "businesses/71/photo/03_card_d13368da2d0349a5ba1ee158cff80a9d.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/71/photo/03_thumb_d468613b4df44c0293d97f5401d2b90b.jpg",
        thumbnail_key:
          "businesses/71/photo/03_thumb_d468613b4df44c0293d97f5401d2b90b.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/71/photo/04_card_748a933e4fff4dd1801a9f29f5248863.jpg",
        url_key:
          "businesses/71/photo/04_card_748a933e4fff4dd1801a9f29f5248863.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/71/photo/04_thumb_9c15464a3fef4073adba0abad76a5fd6.jpg",
        thumbnail_key:
          "businesses/71/photo/04_thumb_9c15464a3fef4073adba0abad76a5fd6.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 29,
    owner: {
      id: 72,
      fullname: "A&A Dent",
      username: "aa_dent",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/72/7b2cfc14f6934027841846aed44069b6.jpg",
      profession: "Cabinet Stomatologic",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Cabinet Stomatologic",
    business_short_domain: "Medical",
    address: "bloc v 12, Strada Vlad Județul 6, București 031304, România",
    coordinates: {
      lat: 44.41966710000001,
      lng: 26.1279718,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/29/photo/00_card_ed1189b9cb5c4929af4a1cf744475c2c.jpg",
        url_key:
          "businesses/29/photo/00_card_ed1189b9cb5c4929af4a1cf744475c2c.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/29/photo/00_thumb_9127c9aaaa6d42d4906a1891dd739c13.jpg",
        thumbnail_key:
          "businesses/29/photo/00_thumb_9127c9aaaa6d42d4906a1891dd739c13.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/29/photo/01_card_e6fad338d8b24b9081d3ec6be84731a3.jpg",
        url_key:
          "businesses/29/photo/01_card_e6fad338d8b24b9081d3ec6be84731a3.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/29/photo/01_thumb_f8179e34317e4aeb997152c41dc51e64.jpg",
        thumbnail_key:
          "businesses/29/photo/01_thumb_f8179e34317e4aeb997152c41dc51e64.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/29/photo/02_card_8040594fa2b14c1e97cec711a1e9e17e.jpg",
        url_key:
          "businesses/29/photo/02_card_8040594fa2b14c1e97cec711a1e9e17e.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/29/photo/02_thumb_9756120895bb40ea8586cf0bd6def612.jpg",
        thumbnail_key:
          "businesses/29/photo/02_thumb_9756120895bb40ea8586cf0bd6def612.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/29/photo/03_card_9e7fbe7642984460b8495ce3ed9cbc6d.jpg",
        url_key:
          "businesses/29/photo/03_card_9e7fbe7642984460b8495ce3ed9cbc6d.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/29/photo/03_thumb_dd4d636c69a946fe98811be343ebdcda.jpg",
        thumbnail_key:
          "businesses/29/photo/03_thumb_dd4d636c69a946fe98811be343ebdcda.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/29/photo/04_card_3a53afa8270044088401a67d143889cb.jpg",
        url_key:
          "businesses/29/photo/04_card_3a53afa8270044088401a67d143889cb.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/29/photo/04_thumb_09366dfbf1df4648bc4d776f096060ce.jpg",
        thumbnail_key:
          "businesses/29/photo/04_thumb_09366dfbf1df4648bc4d776f096060ce.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 38,
    owner: {
      id: 187,
      fullname: "Corner Barbershop",
      username: "corner_barbershop",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/187/0dfd911e44764e9b80097f5d93796e57.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Strada Odei 153, București 041046, România",
    coordinates: {
      lat: 44.37488949999999,
      lng: 26.1125764,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/38/photo/00_card_8e34b75f71b84af89d43acc8b487687a.jpg",
        url_key:
          "businesses/38/photo/00_card_8e34b75f71b84af89d43acc8b487687a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/38/photo/00_thumb_461a98e53fd642e78c63f5ecfdf2ff1f.jpg",
        thumbnail_key:
          "businesses/38/photo/00_thumb_461a98e53fd642e78c63f5ecfdf2ff1f.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/38/photo/01_card_08fe77f9a3ba46ddb2b8e7d4c8540c23.jpg",
        url_key:
          "businesses/38/photo/01_card_08fe77f9a3ba46ddb2b8e7d4c8540c23.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/38/photo/01_thumb_dc429108c69645149eab4fb0a9f0e51f.jpg",
        thumbnail_key:
          "businesses/38/photo/01_thumb_dc429108c69645149eab4fb0a9f0e51f.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/38/photo/02_card_e3e2beea3b43416baf0e3918e121acc8.jpg",
        url_key:
          "businesses/38/photo/02_card_e3e2beea3b43416baf0e3918e121acc8.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/38/photo/02_thumb_fdc87f7a654b4f55a5da12b8f3fe19f6.jpg",
        thumbnail_key:
          "businesses/38/photo/02_thumb_fdc87f7a654b4f55a5da12b8f3fe19f6.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/38/photo/03_card_f20d03a7cf7242fc9cba8e357a77324a.jpg",
        url_key:
          "businesses/38/photo/03_card_f20d03a7cf7242fc9cba8e357a77324a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/38/photo/03_thumb_17a6eb42109a4e52a0a22079f7a6aea4.jpg",
        thumbnail_key:
          "businesses/38/photo/03_thumb_17a6eb42109a4e52a0a22079f7a6aea4.jpg",
        type: "photo",
        order_index: 3,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 32,
    owner: {
      id: 177,
      fullname: "Dentalist",
      username: "dentalist",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/177/505839fb0ea64e669289d5fe5b544efe.jpg",
      profession: "Cabinet Stomatologic",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Cabinet Stomatologic",
    business_short_domain: "Medical",
    address: "Intrarea Tăciunelui 5, București 014192, România",
    coordinates: {
      lat: 44.468942,
      lng: 26.1113035,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/32/photo/00_card_2947554620bf4a0a9a42af695bb8b06b.jpg",
        url_key:
          "businesses/32/photo/00_card_2947554620bf4a0a9a42af695bb8b06b.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/32/photo/00_thumb_e769f7b0941f4efaafebfb7a51baf9be.jpg",
        thumbnail_key:
          "businesses/32/photo/00_thumb_e769f7b0941f4efaafebfb7a51baf9be.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/32/photo/01_card_b586e811d0b54441a65f6ae34193f68b.jpg",
        url_key:
          "businesses/32/photo/01_card_b586e811d0b54441a65f6ae34193f68b.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/32/photo/01_thumb_1612821480aa4498a3567950dd1b8065.jpg",
        thumbnail_key:
          "businesses/32/photo/01_thumb_1612821480aa4498a3567950dd1b8065.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/32/photo/02_card_6174c30fa73342cabea252c0e5f2079a.jpg",
        url_key:
          "businesses/32/photo/02_card_6174c30fa73342cabea252c0e5f2079a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/32/photo/02_thumb_ceb5e12b16764806bd2b5be84b469bc0.jpg",
        thumbnail_key:
          "businesses/32/photo/02_thumb_ceb5e12b16764806bd2b5be84b469bc0.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/32/photo/03_card_62519191447140a4825111752a19115d.jpg",
        url_key:
          "businesses/32/photo/03_card_62519191447140a4825111752a19115d.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/32/photo/03_thumb_c2f3effcb8b54110912c6d11ec1963f7.jpg",
        thumbnail_key:
          "businesses/32/photo/03_thumb_c2f3effcb8b54110912c6d11ec1963f7.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/32/photo/04_card_d896ae6a1e5c47f1bdc228f6aefc5b5a.jpg",
        url_key:
          "businesses/32/photo/04_card_d896ae6a1e5c47f1bdc228f6aefc5b5a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/32/photo/04_thumb_6a8d210697fe4ce28e86a94964517a70.jpg",
        thumbnail_key:
          "businesses/32/photo/04_thumb_6a8d210697fe4ce28e86a94964517a70.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 42,
    owner: {
      id: 221,
      fullname: "The Barber Cuza",
      username: "the_barber_cuza",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/221/bf74d4687b8d4030a6ca45815f438589.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Bulevardul Alexandru Ioan Cuza Nr 105, București 011054, România",
    coordinates: {
      lat: 44.451888,
      lng: 26.0723637,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/42/photo/00_card_e1e8aa847211472d93f964439e156390.jpg",
        url_key:
          "businesses/42/photo/00_card_e1e8aa847211472d93f964439e156390.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/42/photo/00_thumb_9e524f98fdff453d89ec13c4539b93d0.jpg",
        thumbnail_key:
          "businesses/42/photo/00_thumb_9e524f98fdff453d89ec13c4539b93d0.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/42/photo/01_card_c7e559a6fdb84ade9350d1b65b57990a.jpg",
        url_key:
          "businesses/42/photo/01_card_c7e559a6fdb84ade9350d1b65b57990a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/42/photo/01_thumb_c5195a57efe44a31a4d4ac32e95599e2.jpg",
        thumbnail_key:
          "businesses/42/photo/01_thumb_c5195a57efe44a31a4d4ac32e95599e2.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/42/photo/02_card_127b1428b3da4e90b8a31ed866b73207.jpg",
        url_key:
          "businesses/42/photo/02_card_127b1428b3da4e90b8a31ed866b73207.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/42/photo/02_thumb_441250ffea474e9996441c0b96a3ec15.jpg",
        thumbnail_key:
          "businesses/42/photo/02_thumb_441250ffea474e9996441c0b96a3ec15.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/42/photo/03_card_b3bc842018984af6a84781e174ba5d0c.jpg",
        url_key:
          "businesses/42/photo/03_card_b3bc842018984af6a84781e174ba5d0c.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/42/photo/03_thumb_84680783d17f441b8cdf3dcc6c576baa.jpg",
        thumbnail_key:
          "businesses/42/photo/03_thumb_84680783d17f441b8cdf3dcc6c576baa.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/42/photo/04_card_8e2bb240fda14c6bbe44a44899a692e0.jpg",
        url_key:
          "businesses/42/photo/04_card_8e2bb240fda14c6bbe44a44899a692e0.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/42/photo/04_thumb_e137d1c2c623425a8d9a6a5533b6c7b0.jpg",
        thumbnail_key:
          "businesses/42/photo/04_thumb_e137d1c2c623425a8d9a6a5533b6c7b0.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 47,
    owner: {
      id: 248,
      fullname: "Family Dent",
      username: "family_dent",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/248/89316b3c166d44c28206952c8718c7de.jpg",
      profession: "Cabinet Stomatologic",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Cabinet Stomatologic",
    business_short_domain: "Medical",
    address: "Strada Boișoara 10, București 060227, România",
    coordinates: {
      lat: 44.44859779999999,
      lng: 26.0564555,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/47/photo/00_card_00be921683754627b2487d37f7f65d80.jpg",
        url_key:
          "businesses/47/photo/00_card_00be921683754627b2487d37f7f65d80.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/47/photo/00_thumb_6dcb24635445452a8dfe3bd8cb92a2a2.jpg",
        thumbnail_key:
          "businesses/47/photo/00_thumb_6dcb24635445452a8dfe3bd8cb92a2a2.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/47/photo/01_card_0127a596a96a4da9aa29d52f735924cf.jpg",
        url_key:
          "businesses/47/photo/01_card_0127a596a96a4da9aa29d52f735924cf.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/47/photo/01_thumb_49a42c125ea843318961307c20b1864c.jpg",
        thumbnail_key:
          "businesses/47/photo/01_thumb_49a42c125ea843318961307c20b1864c.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/47/photo/02_card_8c80aaa015ac4a8a9d13642f76af443a.jpg",
        url_key:
          "businesses/47/photo/02_card_8c80aaa015ac4a8a9d13642f76af443a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/47/photo/02_thumb_e7629559dbf84d8b9864ba862cae268d.jpg",
        thumbnail_key:
          "businesses/47/photo/02_thumb_e7629559dbf84d8b9864ba862cae268d.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/47/photo/03_card_0d6fe3bbd2514017bb7c586af1398117.jpg",
        url_key:
          "businesses/47/photo/03_card_0d6fe3bbd2514017bb7c586af1398117.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/47/photo/03_thumb_e5388d0908b44ef7ba4354d834883046.jpg",
        thumbnail_key:
          "businesses/47/photo/03_thumb_e5388d0908b44ef7ba4354d834883046.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/47/photo/04_card_ebfa3cad020049ff99e96b1cbc76876a.jpg",
        url_key:
          "businesses/47/photo/04_card_ebfa3cad020049ff99e96b1cbc76876a.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/47/photo/04_thumb_66b0639bf4a3493d87b94b75233d3979.jpg",
        thumbnail_key:
          "businesses/47/photo/04_thumb_66b0639bf4a3493d87b94b75233d3979.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 31,
    owner: {
      id: 175,
      fullname: "Verdent",
      username: "verdent",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/175/de36c18d175c4e4b9815eba890cbced5.jpg",
      profession: "Cabinet Stomatologic",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Cabinet Stomatologic",
    business_short_domain: "Medical",
    address:
      "Bloc M5AAdresa:, Bulevardul Theodor Pallady 18, București 032263, România",
    coordinates: {
      lat: 44.4108758,
      lng: 26.1706762,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/31/photo/00_card_4851b4f2a8b94875a1fc645029ad3f1b.jpg",
        url_key:
          "businesses/31/photo/00_card_4851b4f2a8b94875a1fc645029ad3f1b.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/31/photo/00_thumb_913a767ad6834f0184fcf48411df5ba4.jpg",
        thumbnail_key:
          "businesses/31/photo/00_thumb_913a767ad6834f0184fcf48411df5ba4.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/31/photo/01_card_5fa303afaf9246c891a525d297f0e160.jpg",
        url_key:
          "businesses/31/photo/01_card_5fa303afaf9246c891a525d297f0e160.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/31/photo/01_thumb_f5cf5cf672c0476babe6c4fdb579306b.jpg",
        thumbnail_key:
          "businesses/31/photo/01_thumb_f5cf5cf672c0476babe6c4fdb579306b.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/31/photo/02_card_c80154da8ecc49249522afbf33c04a96.jpg",
        url_key:
          "businesses/31/photo/02_card_c80154da8ecc49249522afbf33c04a96.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/31/photo/02_thumb_8b37ede51ba443fd90ac8a566be814cd.jpg",
        thumbnail_key:
          "businesses/31/photo/02_thumb_8b37ede51ba443fd90ac8a566be814cd.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/31/photo/03_card_cb86dc662b084b60b48081d464064c9d.jpg",
        url_key:
          "businesses/31/photo/03_card_cb86dc662b084b60b48081d464064c9d.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/31/photo/03_thumb_aa36d5bd0c054b90be7d61f890cd7457.jpg",
        thumbnail_key:
          "businesses/31/photo/03_thumb_aa36d5bd0c054b90be7d61f890cd7457.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/31/photo/04_card_d851a9d450fc4721a848b82e2fab20ea.jpg",
        url_key:
          "businesses/31/photo/04_card_d851a9d450fc4721a848b82e2fab20ea.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/31/photo/04_thumb_a6136a64c08042fb97aa461f4ff06c2a.jpg",
        thumbnail_key:
          "businesses/31/photo/04_thumb_a6136a64c08042fb97aa461f4ff06c2a.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 70,
    owner: {
      id: 264,
      fullname: "Ad Premium Service",
      username: "adpremium_service",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/264/c6dfe17a25b643a6b3648e7b3f474426.jpg",
      profession: "Stație ITP",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Stație ITP",
    business_short_domain: "Auto",
    address: "Strada Petrolului 3, București 040829, România",
    coordinates: {
      lat: 44.3882979,
      lng: 26.1089977,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/70/photo/00_card_ac6218e4508444d7b8707f000ec1094e.jpg",
        url_key:
          "businesses/70/photo/00_card_ac6218e4508444d7b8707f000ec1094e.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/70/photo/00_thumb_da55f5662f0942b3a47397b4dd818526.jpg",
        thumbnail_key:
          "businesses/70/photo/00_thumb_da55f5662f0942b3a47397b4dd818526.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/70/photo/01_card_3a2a89f683b54dc7acae52bd84ca95ec.jpg",
        url_key:
          "businesses/70/photo/01_card_3a2a89f683b54dc7acae52bd84ca95ec.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/70/photo/01_thumb_aedb60b0d2774212a2a76921a98c6672.jpg",
        thumbnail_key:
          "businesses/70/photo/01_thumb_aedb60b0d2774212a2a76921a98c6672.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/70/photo/02_card_4090d33a8d954838899f49403651ac1b.jpg",
        url_key:
          "businesses/70/photo/02_card_4090d33a8d954838899f49403651ac1b.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/70/photo/02_thumb_5db3a632b2b741289b433622dd8e1f77.jpg",
        thumbnail_key:
          "businesses/70/photo/02_thumb_5db3a632b2b741289b433622dd8e1f77.jpg",
        type: "photo",
        order_index: 2,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 3,
    owner: {
      id: 4,
      fullname: "Virgil The Barber",
      username: "virgil_the_barber",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/4/38792e71147c4b5598f5d43c823602be.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Strada Gheorghe Dem Teodorescu 11D, București 030915, România",
    coordinates: {
      lat: 44.4303214,
      lng: 26.1292556,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/3/photo/00_card_4dd6cc2676654cc1b010c752ca860f6e.jpg",
        url_key:
          "businesses/3/photo/00_card_4dd6cc2676654cc1b010c752ca860f6e.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/3/photo/00_thumb_e9ad8fa73f7e47f9b48399208e69fccb.jpg",
        thumbnail_key:
          "businesses/3/photo/00_thumb_e9ad8fa73f7e47f9b48399208e69fccb.jpg",
        type: "photo",
        order_index: 0,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 5,
    owner: {
      id: 9,
      fullname: "Art Cut Studio",
      username: "art_cut_studio",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/9/92317d6e84094e81a53d953238376a4b.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Bulevardul Iuliu Maniu 69, București 077042, România",
    coordinates: {
      lat: 44.4336986,
      lng: 26.0160087,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/5/photo/00_card_874deeab2e5e4cce8042a26c84dae83d.jpg",
        url_key:
          "businesses/5/photo/00_card_874deeab2e5e4cce8042a26c84dae83d.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/5/photo/00_thumb_cbbb83fded5e492183cf9430eb567f96.jpg",
        thumbnail_key:
          "businesses/5/photo/00_thumb_cbbb83fded5e492183cf9430eb567f96.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/5/photo/01_card_5cd9790388404a58a0d2243a890f45e5.jpg",
        url_key:
          "businesses/5/photo/01_card_5cd9790388404a58a0d2243a890f45e5.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/5/photo/01_thumb_04085e3af27544ecb39f5c6212b49d90.jpg",
        thumbnail_key:
          "businesses/5/photo/01_thumb_04085e3af27544ecb39f5c6212b49d90.jpg",
        type: "photo",
        order_index: 1,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 49,
    owner: {
      id: 250,
      fullname: "Dent For Life",
      username: "dent_for_life",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/250/7d15ee7a19044247adc2bb39aab325d6.jpg",
      profession: "Cabinet Stomatologic",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Cabinet Stomatologic",
    business_short_domain: "Medical",
    address: "Piața Unirii, București, România",
    coordinates: {
      lat: 44.4271271,
      lng: 26.1025059,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/49/photo/00_card_b6cde94809b74a5b8cd7ae3cc6771050.jpg",
        url_key:
          "businesses/49/photo/00_card_b6cde94809b74a5b8cd7ae3cc6771050.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/49/photo/00_thumb_d35757702ebf41d7ac6d10b540947877.jpg",
        thumbnail_key:
          "businesses/49/photo/00_thumb_d35757702ebf41d7ac6d10b540947877.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/49/photo/01_card_84885e4e6d7c4973a258d2492250ac02.jpg",
        url_key:
          "businesses/49/photo/01_card_84885e4e6d7c4973a258d2492250ac02.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/49/photo/01_thumb_1cd59fcae83e42d9b3fe434e555e125a.jpg",
        thumbnail_key:
          "businesses/49/photo/01_thumb_1cd59fcae83e42d9b3fe434e555e125a.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/49/photo/02_card_df1d980efa134fb2add21162dd83eb97.jpg",
        url_key:
          "businesses/49/photo/02_card_df1d980efa134fb2add21162dd83eb97.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/49/photo/02_thumb_133696b852394ec9a1cd7bfcf9d8bd13.jpg",
        thumbnail_key:
          "businesses/49/photo/02_thumb_133696b852394ec9a1cd7bfcf9d8bd13.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/49/photo/03_card_2876620bc44a476aa37dc3618ac4bf8b.jpg",
        url_key:
          "businesses/49/photo/03_card_2876620bc44a476aa37dc3618ac4bf8b.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/49/photo/03_thumb_1a5729da9879433c8a5126e3a9e339ca.jpg",
        thumbnail_key:
          "businesses/49/photo/03_thumb_1a5729da9879433c8a5126e3a9e339ca.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/49/photo/04_card_5c22fe48e4584fde9b09bd5df218b6aa.jpg",
        url_key:
          "businesses/49/photo/04_card_5c22fe48e4584fde9b09bd5df218b6aa.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/49/photo/04_thumb_967688a5c3764812ba9442f1c79d3318.jpg",
        thumbnail_key:
          "businesses/49/photo/04_thumb_967688a5c3764812ba9442f1c79d3318.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 4,
    owner: {
      id: 5,
      fullname: "Hircut Factory",
      username: "haircut_factory",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/5/3c277f11da6b45e48b8bdbaa0c77506d.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Strada Valea Cascadelor 2, București, România",
    coordinates: {
      lat: 44.43304799999999,
      lng: 26.005343,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/4/photo/00_card_f99d940fa6554ac7ae33ccf7fb95a34f.jpg",
        url_key:
          "businesses/4/photo/00_card_f99d940fa6554ac7ae33ccf7fb95a34f.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/4/photo/00_thumb_60fe2728d06f44ffbd0eb0ffd17750ea.jpg",
        thumbnail_key:
          "businesses/4/photo/00_thumb_60fe2728d06f44ffbd0eb0ffd17750ea.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/4/photo/01_card_f124364bf7124063be8cf679ad7524d0.jpg",
        url_key:
          "businesses/4/photo/01_card_f124364bf7124063be8cf679ad7524d0.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/4/photo/01_thumb_301c079f82104e17b4b86b580d88f837.jpg",
        thumbnail_key:
          "businesses/4/photo/01_thumb_301c079f82104e17b4b86b580d88f837.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/4/photo/02_card_6d31cb4d0f2f4bf18589e7d8dcf5f18c.jpg",
        url_key:
          "businesses/4/photo/02_card_6d31cb4d0f2f4bf18589e7d8dcf5f18c.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/4/photo/02_thumb_23a1341927e442c7be41f9976b0af9e4.jpg",
        thumbnail_key:
          "businesses/4/photo/02_thumb_23a1341927e442c7be41f9976b0af9e4.jpg",
        type: "photo",
        order_index: 2,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 30,
    owner: {
      id: 173,
      fullname: "World Dentistry Clinic",
      username: "world_dentistry_clinic",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/173/64d24a1e69e24b9095f3d22ae69ca6a5.jpg",
      profession: "Cabinet Stomatologic",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Cabinet Stomatologic",
    business_short_domain: "Medical",
    address: "Strada Traian Popovici 79, București, România",
    coordinates: {
      lat: 44.422702,
      lng: 26.133087,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/30/photo/00_card_81aca959a02e456a944ac118cb15c282.jpg",
        url_key:
          "businesses/30/photo/00_card_81aca959a02e456a944ac118cb15c282.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/30/photo/00_thumb_b74667d1b43a425fb192dd82fe27cf50.jpg",
        thumbnail_key:
          "businesses/30/photo/00_thumb_b74667d1b43a425fb192dd82fe27cf50.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/30/photo/01_card_2230abe6840840d6864c4e8ec0ea1d4e.jpg",
        url_key:
          "businesses/30/photo/01_card_2230abe6840840d6864c4e8ec0ea1d4e.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/30/photo/01_thumb_7aea4b9951fa4b199f19592cbb0e5c74.jpg",
        thumbnail_key:
          "businesses/30/photo/01_thumb_7aea4b9951fa4b199f19592cbb0e5c74.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/30/photo/02_card_4109d060a5504544ba567796e22805f1.jpg",
        url_key:
          "businesses/30/photo/02_card_4109d060a5504544ba567796e22805f1.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/30/photo/02_thumb_b8dfcd7ab42241798360fc5bcc2a0003.jpg",
        thumbnail_key:
          "businesses/30/photo/02_thumb_b8dfcd7ab42241798360fc5bcc2a0003.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/30/photo/03_card_a4891fc0213c460090f95b40bded6a8c.jpg",
        url_key:
          "businesses/30/photo/03_card_a4891fc0213c460090f95b40bded6a8c.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/30/photo/03_thumb_2a40bf15deb8460da973c0a82d0fddcc.jpg",
        thumbnail_key:
          "businesses/30/photo/03_thumb_2a40bf15deb8460da973c0a82d0fddcc.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/30/photo/04_card_728042ab3e644e529aee44a24a3a5f87.jpg",
        url_key:
          "businesses/30/photo/04_card_728042ab3e644e529aee44a24a3a5f87.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/30/photo/04_thumb_bc19026191454ce8a3ad4afe0ba3b8b9.jpg",
        thumbnail_key:
          "businesses/30/photo/04_thumb_bc19026191454ce8a3ad4afe0ba3b8b9.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 41,
    owner: {
      id: 190,
      fullname: "King's Barbershop",
      username: "kings_barbershop",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/190/db4863e0781f48e8afa93981b61cd165.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Strada Împăratul Traian 76, București 041415, România",
    coordinates: {
      lat: 44.3920538,
      lng: 26.1086195,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/41/photo/00_card_991a735815ab44459183939debfc7f4c.jpg",
        url_key:
          "businesses/41/photo/00_card_991a735815ab44459183939debfc7f4c.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/41/photo/00_thumb_9a52f7188f98452dbf78d18b9d225c8b.jpg",
        thumbnail_key:
          "businesses/41/photo/00_thumb_9a52f7188f98452dbf78d18b9d225c8b.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/41/photo/01_card_11434e244b534b6f87dc0b0e268c6fec.jpg",
        url_key:
          "businesses/41/photo/01_card_11434e244b534b6f87dc0b0e268c6fec.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/41/photo/01_thumb_ae1021a122b34609ab3f605673e984ef.jpg",
        thumbnail_key:
          "businesses/41/photo/01_thumb_ae1021a122b34609ab3f605673e984ef.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/41/photo/02_card_cc067d34b4ba45b8bca22b3dbabb4d41.jpg",
        url_key:
          "businesses/41/photo/02_card_cc067d34b4ba45b8bca22b3dbabb4d41.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/41/photo/02_thumb_0395a5b7af324a97ac4a5876164e4919.jpg",
        thumbnail_key:
          "businesses/41/photo/02_thumb_0395a5b7af324a97ac4a5876164e4919.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/41/photo/03_card_24dbf36e487c4821a72fafc16031ce0e.jpg",
        url_key:
          "businesses/41/photo/03_card_24dbf36e487c4821a72fafc16031ce0e.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/41/photo/03_thumb_d540b28fc9e04304ac13d10edd1f1e30.jpg",
        thumbnail_key:
          "businesses/41/photo/03_thumb_d540b28fc9e04304ac13d10edd1f1e30.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/41/photo/04_card_3b687be69e35467c97b01870c36d7184.jpg",
        url_key:
          "businesses/41/photo/04_card_3b687be69e35467c97b01870c36d7184.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/41/photo/04_thumb_d788542d57f6433ea177273aeba0fbc0.jpg",
        thumbnail_key:
          "businesses/41/photo/04_thumb_d788542d57f6433ea177273aeba0fbc0.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 80,
    owner: {
      id: 269,
      fullname: "Capital Service Auto",
      username: "capital_service_auto",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/269/b1c0d38fa8174aa890d0de8b7335a16a.jpg",
      profession: "Service auto",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Service auto",
    business_short_domain: "Auto",
    address: "Strada Pogoanele 159, București 041117, România",
    coordinates: {
      lat: 44.3675325,
      lng: 26.1038673,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/80/photo/01_card_fdc4c21ee3ff4bd0901ad61b196b51da.jpg",
        url_key:
          "businesses/80/photo/01_card_fdc4c21ee3ff4bd0901ad61b196b51da.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/80/photo/01_thumb_21ac3f42e8eb49e48a76642e2b1568c1.jpg",
        thumbnail_key:
          "businesses/80/photo/01_thumb_21ac3f42e8eb49e48a76642e2b1568c1.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/80/photo/02_card_be73ddf8cfbb4c079685d3e84d7b3464.jpg",
        url_key:
          "businesses/80/photo/02_card_be73ddf8cfbb4c079685d3e84d7b3464.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/80/photo/02_thumb_19506e5077d94d45be726ff3bf7c4434.jpg",
        thumbnail_key:
          "businesses/80/photo/02_thumb_19506e5077d94d45be726ff3bf7c4434.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/80/photo/03_card_41f838e33852458c8ae9e140ee11b3ce.jpg",
        url_key:
          "businesses/80/photo/03_card_41f838e33852458c8ae9e140ee11b3ce.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/80/photo/03_thumb_0060f4716d5b44b7b68d2709d5e9aef3.jpg",
        thumbnail_key:
          "businesses/80/photo/03_thumb_0060f4716d5b44b7b68d2709d5e9aef3.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/80/photo/04_card_d103ba2528964cad97e4e211b110a143.jpg",
        url_key:
          "businesses/80/photo/04_card_d103ba2528964cad97e4e211b110a143.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/80/photo/04_thumb_3b3ed6fcbc1c4de7af975f0368892e98.jpg",
        thumbnail_key:
          "businesses/80/photo/04_thumb_3b3ed6fcbc1c4de7af975f0368892e98.jpg",
        type: "photo",
        order_index: 3,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 64,
    owner: {
      id: 260,
      fullname: "Masaj Artemis",
      username: "masaj_artemis",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/260/b45ea5ac2c5e4fce93324a45354fdfe1.jpg",
      profession: "Salon de masaj & spa",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Salon de masaj & spa",
    business_short_domain: "Beauty",
    address: "Strada General Constantin Coandă 13, București 010646, România",
    coordinates: {
      lat: 44.450906,
      lng: 26.0924731,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/64/photo/00_card_29bd96e33d4d4f0088335a507ef6c623.jpg",
        url_key:
          "businesses/64/photo/00_card_29bd96e33d4d4f0088335a507ef6c623.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/64/photo/00_thumb_c0f42e56f0314b2aa743f7959d096b52.jpg",
        thumbnail_key:
          "businesses/64/photo/00_thumb_c0f42e56f0314b2aa743f7959d096b52.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/64/photo/01_card_9b9f08a17a204becaec597a1eb756a82.jpg",
        url_key:
          "businesses/64/photo/01_card_9b9f08a17a204becaec597a1eb756a82.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/64/photo/01_thumb_39b4dc595112459aafb62f6da53709c2.jpg",
        thumbnail_key:
          "businesses/64/photo/01_thumb_39b4dc595112459aafb62f6da53709c2.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/64/photo/02_card_ec19882f7efd4ae68a3ef31d0aef4c2f.jpg",
        url_key:
          "businesses/64/photo/02_card_ec19882f7efd4ae68a3ef31d0aef4c2f.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/64/photo/02_thumb_6d0fb03793274c959b69115ee5a954c5.jpg",
        thumbnail_key:
          "businesses/64/photo/02_thumb_6d0fb03793274c959b69115ee5a954c5.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/64/photo/03_card_65bed15edf664173be29ce7415ba82ab.jpg",
        url_key:
          "businesses/64/photo/03_card_65bed15edf664173be29ce7415ba82ab.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/64/photo/03_thumb_9955710d5d3f407bb98c0aa59d107a6a.jpg",
        thumbnail_key:
          "businesses/64/photo/03_thumb_9955710d5d3f407bb98c0aa59d107a6a.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/64/photo/04_card_fac8c28990ce4992b50aa3d38a89eee7.jpg",
        url_key:
          "businesses/64/photo/04_card_fac8c28990ce4992b50aa3d38a89eee7.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/64/photo/04_thumb_aa8779ba470f4333a8a9688d618a5aa0.jpg",
        thumbnail_key:
          "businesses/64/photo/04_thumb_aa8779ba470f4333a8a9688d618a5aa0.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 92,
    owner: {
      id: 283,
      fullname: "Clinica Blue",
      username: "clinica_blue",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/283/885cc5e1a8fd4b22b863f7f288be44e2.jpg",
      profession: "Cabinet psihologic",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Cabinet psihologic",
    business_short_domain: "Medical",
    address: "Șoseaua Pipera 61, 077190 București, România",
    coordinates: {
      lat: 44.4842394,
      lng: 26.1088294,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/92/photo/00_card_fcced6ff646544c98f9f658ed9901811.jpg",
        url_key:
          "businesses/92/photo/00_card_fcced6ff646544c98f9f658ed9901811.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/92/photo/00_thumb_71fe458896ca45759cd6c82373e9848d.jpg",
        thumbnail_key:
          "businesses/92/photo/00_thumb_71fe458896ca45759cd6c82373e9848d.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/92/photo/01_card_d9592111ad5142798799ca0f13896339.jpg",
        url_key:
          "businesses/92/photo/01_card_d9592111ad5142798799ca0f13896339.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/92/photo/01_thumb_528e2785f4054df3bef9c4f8d9c6dca4.jpg",
        thumbnail_key:
          "businesses/92/photo/01_thumb_528e2785f4054df3bef9c4f8d9c6dca4.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/92/photo/02_card_8e16931cd1ff41e8beea039e90c3c4ac.jpg",
        url_key:
          "businesses/92/photo/02_card_8e16931cd1ff41e8beea039e90c3c4ac.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/92/photo/02_thumb_dd2f53a820d04899836ab9b8987a9403.jpg",
        thumbnail_key:
          "businesses/92/photo/02_thumb_dd2f53a820d04899836ab9b8987a9403.jpg",
        type: "photo",
        order_index: 2,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 39,
    owner: {
      id: 188,
      fullname: "The Brother Hood Barber Shop",
      username: "the_brother_hood",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/188/1019d1a1de214cc49cd9e4101a2b31b4.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Drumul Crețeștilor 5, București 042183, România",
    coordinates: {
      lat: 44.3731665,
      lng: 26.1371887,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/39/photo/00_card_5fa9d2896c6a4652b36aca98f26ae74c.jpg",
        url_key:
          "businesses/39/photo/00_card_5fa9d2896c6a4652b36aca98f26ae74c.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/39/photo/00_thumb_dc1510114b764f4e80d3541bce435636.jpg",
        thumbnail_key:
          "businesses/39/photo/00_thumb_dc1510114b764f4e80d3541bce435636.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/39/photo/01_card_5228687e177c4121932a34dc070f04c1.jpg",
        url_key:
          "businesses/39/photo/01_card_5228687e177c4121932a34dc070f04c1.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/39/photo/01_thumb_cbc9d24094814ea5a0964b3173762082.jpg",
        thumbnail_key:
          "businesses/39/photo/01_thumb_cbc9d24094814ea5a0964b3173762082.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/39/photo/02_card_ef698b75c69549e4ab7185e1aff80534.jpg",
        url_key:
          "businesses/39/photo/02_card_ef698b75c69549e4ab7185e1aff80534.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/39/photo/02_thumb_1750b0f5858744ca9bb3afd84244ab63.jpg",
        thumbnail_key:
          "businesses/39/photo/02_thumb_1750b0f5858744ca9bb3afd84244ab63.jpg",
        type: "photo",
        order_index: 2,
      },
    ],
    is_primary: false,
    has_video: false,
  },
  {
    id: 89,
    owner: {
      id: 277,
      fullname: "Enzo Detailing",
      username: "enzo_detailing",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/277/762fc232358641c197abcd76228fbce1.jpg",
      profession: "Centru detailing auto",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Centru detailing auto",
    business_short_domain: "Auto",
    address: "Strada București 33 35, 917100 București, România",
    coordinates: {
      lat: 44.3576537,
      lng: 25.9914003,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/89/photo/00_card_10b46f4d0bfc40b5a5bb67e45b2c8139.jpg",
        url_key:
          "businesses/89/photo/00_card_10b46f4d0bfc40b5a5bb67e45b2c8139.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/89/photo/00_thumb_db76bb06b84546bb95b642860e671ef3.jpg",
        thumbnail_key:
          "businesses/89/photo/00_thumb_db76bb06b84546bb95b642860e671ef3.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/89/photo/01_card_3c720b492ced44f58fc5583708e4a989.jpg",
        url_key:
          "businesses/89/photo/01_card_3c720b492ced44f58fc5583708e4a989.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/89/photo/01_thumb_8a93d410b7c84cfa8a999341ec5dfb37.jpg",
        thumbnail_key:
          "businesses/89/photo/01_thumb_8a93d410b7c84cfa8a999341ec5dfb37.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/89/photo/02_card_08a3353d4b8b4a2e97cdb7938b4064b7.jpg",
        url_key:
          "businesses/89/photo/02_card_08a3353d4b8b4a2e97cdb7938b4064b7.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/89/photo/02_thumb_d1c2ddbb8dc240b280ec7ee839a359f0.jpg",
        thumbnail_key:
          "businesses/89/photo/02_thumb_d1c2ddbb8dc240b280ec7ee839a359f0.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/89/photo/03_card_ed4b0872fa9840648bba11b3a2ecfcee.jpg",
        url_key:
          "businesses/89/photo/03_card_ed4b0872fa9840648bba11b3a2ecfcee.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/89/photo/03_thumb_b07437d8f6c34a459f90acc38d64b06a.jpg",
        thumbnail_key:
          "businesses/89/photo/03_thumb_b07437d8f6c34a459f90acc38d64b06a.jpg",
        type: "photo",
        order_index: 3,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/89/photo/04_card_7713189d543d408083790aeb128a837d.jpg",
        url_key:
          "businesses/89/photo/04_card_7713189d543d408083790aeb128a837d.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/89/photo/04_thumb_36d41094b86e4f5cb8516b5a1be204d6.jpg",
        thumbnail_key:
          "businesses/89/photo/04_thumb_36d41094b86e4f5cb8516b5a1be204d6.jpg",
        type: "photo",
        order_index: 4,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 26,
    owner: {
      id: 69,
      fullname: "Family Barber",
      username: "family_barber",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/69/ce6e4ef67ce64691a2a2c95bc64e67d7.jpg",
      profession: "Frizerie",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Frizerie",
    business_short_domain: "Beauty",
    address: "Strada Subcetate 14, București, România",
    coordinates: {
      lat: 44.4832367,
      lng: 26.0310705,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/26/photo/00_card_a0cb48ecf8ec44eeb69cf314325cecb9.jpg",
        url_key:
          "businesses/26/photo/00_card_a0cb48ecf8ec44eeb69cf314325cecb9.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/26/photo/00_thumb_2a4ddae59d5e4eec94554a6b7aa66f3a.jpg",
        thumbnail_key:
          "businesses/26/photo/00_thumb_2a4ddae59d5e4eec94554a6b7aa66f3a.jpg",
        type: "photo",
        order_index: 0,
      },
    ],
    is_primary: true,
    has_video: false,
  },
  {
    id: 102,
    owner: {
      id: 296,
      fullname: "Ritter ITP",
      username: "ritter_itp",
      avatar:
        "https://media.scrollbooker.ro/avatars/users/296/c8ab89c1cda4476cb280c21059f81d65.jpg",
      profession: "Stație ITP",
      ratings_average: 5.0,
      ratings_count: 0,
    },
    business_type: "Stație ITP",
    business_short_domain: "Auto",
    address: "Bulevardul Timișoara 103-111, 061992 București, România",
    coordinates: {
      lat: 44.4240455,
      lng: 26.0085452,
    },
    media_files: [
      {
        url: "https://media.scrollbooker.ro/businesses/102/photo/00_card_9f6e8c7530d04a8aa34d6efcb7f4ddf4.jpg",
        url_key:
          "businesses/102/photo/00_card_9f6e8c7530d04a8aa34d6efcb7f4ddf4.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/102/photo/00_thumb_34b154bd038f4550b3807a2051de074e.jpg",
        thumbnail_key:
          "businesses/102/photo/00_thumb_34b154bd038f4550b3807a2051de074e.jpg",
        type: "photo",
        order_index: 0,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/102/photo/01_card_151c8d9c1994417ebd46c4a5645b7147.jpg",
        url_key:
          "businesses/102/photo/01_card_151c8d9c1994417ebd46c4a5645b7147.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/102/photo/01_thumb_6593a07d0c41446cabb782407943acee.jpg",
        thumbnail_key:
          "businesses/102/photo/01_thumb_6593a07d0c41446cabb782407943acee.jpg",
        type: "photo",
        order_index: 1,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/102/photo/02_card_23777d50cd6349f4929d8973b2b520cc.jpg",
        url_key:
          "businesses/102/photo/02_card_23777d50cd6349f4929d8973b2b520cc.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/102/photo/02_thumb_9aaee7776e0c4832b5d96dfacd2d1816.jpg",
        thumbnail_key:
          "businesses/102/photo/02_thumb_9aaee7776e0c4832b5d96dfacd2d1816.jpg",
        type: "photo",
        order_index: 2,
      },
      {
        url: "https://media.scrollbooker.ro/businesses/102/photo/03_card_ff0b07e899ff4591a4ed4b09c42aeee9.jpg",
        url_key:
          "businesses/102/photo/03_card_ff0b07e899ff4591a4ed4b09c42aeee9.jpg",
        thumbnail_url:
          "https://media.scrollbooker.ro/businesses/102/photo/03_thumb_0275e29ff89b42bb9870928bed67a6b3.jpg",
        thumbnail_key:
          "businesses/102/photo/03_thumb_0275e29ff89b42bb9870928bed67a6b3.jpg",
        type: "photo",
        order_index: 3,
      },
    ],
    is_primary: false,
    has_video: false,
  },
];

export const busineses_for_map: PaginatedData<BusinessSheet> = {
  count: 22,
  results: [
    {
      id: 27,
      owner: {
        id: 70,
        fullname: "Frizeria Domenii",
        username: "frizeria_domenii",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/70/5a29dd3eec9c4b5398b5f75317e3a184.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Bulevardul Ion Mihalache 205, București, România",
      coordinates: {
        lat: 44.46548420000001,
        lng: 26.0665291,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/27/photo/00_card_82530838374f4875a0896e742695e1ff.jpg",
          url_key:
            "businesses/27/photo/00_card_82530838374f4875a0896e742695e1ff.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/27/photo/00_thumb_4feb92048ab64f429a7f87c9f28a4309.jpg",
          thumbnail_key:
            "businesses/27/photo/00_thumb_4feb92048ab64f429a7f87c9f28a4309.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/27/photo/01_card_ee2db159ccd8489c874b28cd1ac16fdf.jpg",
          url_key:
            "businesses/27/photo/01_card_ee2db159ccd8489c874b28cd1ac16fdf.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/27/photo/01_thumb_0e7d2fa8b2b6479e9bc639b592603b21.jpg",
          thumbnail_key:
            "businesses/27/photo/01_thumb_0e7d2fa8b2b6479e9bc639b592603b21.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/27/photo/02_card_1cc26bd5293742a883dbe3fac87cbae3.jpg",
          url_key:
            "businesses/27/photo/02_card_1cc26bd5293742a883dbe3fac87cbae3.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/27/photo/02_thumb_1ceee435a6c249d9b34314c8866f9d92.jpg",
          thumbnail_key:
            "businesses/27/photo/02_thumb_1ceee435a6c249d9b34314c8866f9d92.jpg",
          type: "photo",
          order_index: 2,
        },
      ],
      products: [
        {
          name: "Tuns Special",
          description: "Ceva descriere despre acest produs",
          duration: 30,
          service_id: 95,
          business_id: 27,
          currency_id: 1,
          price: 120,
          price_with_discount: 120,
          discount: 0,
          can_be_booked: false,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 116,
          user_id: 103,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2026-01-09T16:31:13.240184Z",
          updated_at: "2026-01-09T16:31:13.240184Z",
        },
        {
          name: "Tuns Special",
          description: "Ceva descriere despre acest produs",
          duration: 30,
          service_id: 95,
          business_id: 27,
          currency_id: 1,
          price: 200,
          price_with_discount: 200,
          discount: 0,
          can_be_booked: false,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 117,
          user_id: 103,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2026-01-09T16:31:26.859599Z",
          updated_at: "2026-01-09T16:31:26.859599Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 2,
      owner: {
        id: 3,
        fullname: "House of Barbers",
        username: "house_of_barbers",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/3/ec699f7d839b4465abe0201fd8fc76f9.jpg",
        profession: "Creator",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Șoseaua Iancului 46, București, România",
      coordinates: {
        lat: 44.4415635,
        lng: 26.1384693,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/2/photo/00_card_c4e0ff599fd94bf29b3915302ecb7e00.jpg",
          url_key:
            "businesses/2/photo/00_card_c4e0ff599fd94bf29b3915302ecb7e00.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/2/photo/00_thumb_bf87a72cfc4842a5bc89d952514b36c3.jpg",
          thumbnail_key:
            "businesses/2/photo/00_thumb_bf87a72cfc4842a5bc89d952514b36c3.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/2/photo/01_card_5fea9a6cd55d40dc9dce85a2028a5b94.jpg",
          url_key:
            "businesses/2/photo/01_card_5fea9a6cd55d40dc9dce85a2028a5b94.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/2/photo/01_thumb_16f482f27f34483d91ed21e3fde366e2.jpg",
          thumbnail_key:
            "businesses/2/photo/01_thumb_16f482f27f34483d91ed21e3fde366e2.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/2/photo/02_card_628797fc4fb54fbc9cd7c6a669759154.jpg",
          url_key:
            "businesses/2/photo/02_card_628797fc4fb54fbc9cd7c6a669759154.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/2/photo/02_thumb_badb7e628da0401bb5b5b16840bc2e0f.jpg",
          thumbnail_key:
            "businesses/2/photo/02_thumb_badb7e628da0401bb5b5b16840bc2e0f.jpg",
          type: "photo",
          order_index: 2,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/2/photo/03_card_f3771467b1ba4642a1c83a94652c7636.jpg",
          url_key:
            "businesses/2/photo/03_card_f3771467b1ba4642a1c83a94652c7636.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/2/photo/03_thumb_849ecf5dba6548b180628d28272cbf01.jpg",
          thumbnail_key:
            "businesses/2/photo/03_thumb_849ecf5dba6548b180628d28272cbf01.jpg",
          type: "photo",
          order_index: 3,
        },
      ],
      products: [
        {
          name: "Tuns",
          description: "Some description",
          duration: 30,
          service_id: 95,
          business_id: 2,
          currency_id: 1,
          price: 100,
          price_with_discount: 100,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 83,
          user_id: 109,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T07:24:17.095685Z",
          updated_at: "2025-12-06T07:24:17.095685Z",
        },
        {
          name: "Tuns",
          description: "Some description",
          duration: 30,
          service_id: 95,
          business_id: 2,
          currency_id: 1,
          price: 200,
          price_with_discount: 200,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 84,
          user_id: 109,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T07:24:26.592286Z",
          updated_at: "2025-12-06T07:24:26.592286Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 12,
      owner: {
        id: 29,
        fullname: "Frizerescu Barber Shop",
        username: "frizerescu_barbers_shop",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/29/e25da8856c14489a8b66ae8cb477f952.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Bulevardul Pipera 36, Voluntari 077190, România",
      coordinates: {
        lat: 44.504832,
        lng: 26.136587,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/12/photo/00_card_58638f3ab2a7456cacd2529c2f4627c6.jpg",
          url_key:
            "businesses/12/photo/00_card_58638f3ab2a7456cacd2529c2f4627c6.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/12/photo/00_thumb_3f26cbc633144f33aa9a3785ff8e9d72.jpg",
          thumbnail_key:
            "businesses/12/photo/00_thumb_3f26cbc633144f33aa9a3785ff8e9d72.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/12/photo/01_card_fba29f754593446e861376b37a0360e9.jpg",
          url_key:
            "businesses/12/photo/01_card_fba29f754593446e861376b37a0360e9.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/12/photo/01_thumb_86eb2b78f45c4878b5871e8e6cd7bec4.jpg",
          thumbnail_key:
            "businesses/12/photo/01_thumb_86eb2b78f45c4878b5871e8e6cd7bec4.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/12/photo/02_card_b54b3e9387c045ae80403a18a01e0cda.jpg",
          url_key:
            "businesses/12/photo/02_card_b54b3e9387c045ae80403a18a01e0cda.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/12/photo/02_thumb_2f42aca46a84450eb335a3e77c62812e.jpg",
          thumbnail_key:
            "businesses/12/photo/02_thumb_2f42aca46a84450eb335a3e77c62812e.jpg",
          type: "photo",
          order_index: 2,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/12/photo/03_card_a3b2bc4cfebe42eb8df37affca4933c2.jpg",
          url_key:
            "businesses/12/photo/03_card_a3b2bc4cfebe42eb8df37affca4933c2.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/12/photo/03_thumb_63eb3a1082fb4b5683797d978f626287.jpg",
          thumbnail_key:
            "businesses/12/photo/03_thumb_63eb3a1082fb4b5683797d978f626287.jpg",
          type: "photo",
          order_index: 3,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/12/photo/04_card_13e7989bd23c48978b6a3c89fa99d766.jpg",
          url_key:
            "businesses/12/photo/04_card_13e7989bd23c48978b6a3c89fa99d766.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/12/photo/04_thumb_d60a14d322714f63b6acc0afd65af8a2.jpg",
          thumbnail_key:
            "businesses/12/photo/04_thumb_d60a14d322714f63b6acc0afd65af8a2.jpg",
          type: "photo",
          order_index: 4,
        },
      ],
      products: [
        {
          name: "Tuns special",
          description: "Some description",
          duration: 30,
          service_id: 95,
          business_id: 12,
          currency_id: 1,
          price: 150,
          price_with_discount: 150,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 75,
          user_id: 135,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T05:02:44.271528Z",
          updated_at: "2025-12-06T05:02:44.271528Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 14,
      owner: {
        id: 55,
        fullname: "Stefan Catalin Concept",
        username: "stefan_catalin_concept",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/55/c0adf585eecf44ea8453c280dafb8b1d.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Rezervelor 89, 077042 Roșu, România",
      coordinates: {
        lat: 44.4435704,
        lng: 25.9887404,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/14/photo/00_card_4f9bfae151cf44bea9793c2c08a31306.jpg",
          url_key:
            "businesses/14/photo/00_card_4f9bfae151cf44bea9793c2c08a31306.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/14/photo/00_thumb_ec723c326f2b422ba94d24bd24db53f1.jpg",
          thumbnail_key:
            "businesses/14/photo/00_thumb_ec723c326f2b422ba94d24bd24db53f1.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/14/photo/01_card_4876da9d5bf34dc7aabd73d63a275e55.jpg",
          url_key:
            "businesses/14/photo/01_card_4876da9d5bf34dc7aabd73d63a275e55.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/14/photo/01_thumb_ae5cd3f431c748cab7ae1686d6af5091.jpg",
          thumbnail_key:
            "businesses/14/photo/01_thumb_ae5cd3f431c748cab7ae1686d6af5091.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/14/photo/02_card_038aea60a9a14e31a6d29ac1b484e820.jpg",
          url_key:
            "businesses/14/photo/02_card_038aea60a9a14e31a6d29ac1b484e820.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/14/photo/02_thumb_0f1e12965eac4b79b015a29f0b1a75d0.jpg",
          thumbnail_key:
            "businesses/14/photo/02_thumb_0f1e12965eac4b79b015a29f0b1a75d0.jpg",
          type: "photo",
          order_index: 2,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/14/photo/03_card_e66f1efc7d3143059c8e80464a950438.jpg",
          url_key:
            "businesses/14/photo/03_card_e66f1efc7d3143059c8e80464a950438.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/14/photo/03_thumb_35547a92205e4139ad88fb2a739dad8e.jpg",
          thumbnail_key:
            "businesses/14/photo/03_thumb_35547a92205e4139ad88fb2a739dad8e.jpg",
          type: "photo",
          order_index: 3,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/14/photo/04_card_7c907ecead344eeeae2877b005c4f564.jpg",
          url_key:
            "businesses/14/photo/04_card_7c907ecead344eeeae2877b005c4f564.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/14/photo/04_thumb_ba83f7a2e0434f6bbbcaf86307598e96.jpg",
          thumbnail_key:
            "businesses/14/photo/04_thumb_ba83f7a2e0434f6bbbcaf86307598e96.jpg",
          type: "photo",
          order_index: 4,
        },
      ],
      products: [
        {
          name: "Tuns",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 14,
          currency_id: 1,
          price: 180,
          price_with_discount: 180,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 93,
          user_id: 47,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T08:16:16.736285Z",
          updated_at: "2025-12-06T08:16:16.736285Z",
        },
        {
          name: "Tuns",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 14,
          currency_id: 1,
          price: 105,
          price_with_discount: 105,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 92,
          user_id: 47,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T08:16:09.573580Z",
          updated_at: "2025-12-06T08:16:09.573580Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 21,
      owner: {
        id: 64,
        fullname: "Filip's Gold",
        username: "filips_gold",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/64/c7dfed305bd843eb9f4f744eb6d668fc.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Bulevardul Iuliu Maniu 71, București 061088, România",
      coordinates: {
        lat: 44.4331391,
        lng: 26.0159592,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/21/photo/00_card_b43cf41da93b4818b2b5c7b9641994b6.jpg",
          url_key:
            "businesses/21/photo/00_card_b43cf41da93b4818b2b5c7b9641994b6.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/21/photo/00_thumb_904794aa528d4ab0895b5d5554666bf6.jpg",
          thumbnail_key:
            "businesses/21/photo/00_thumb_904794aa528d4ab0895b5d5554666bf6.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/21/photo/01_card_d2019d137b774cff8ae8cc35f1012feb.jpg",
          url_key:
            "businesses/21/photo/01_card_d2019d137b774cff8ae8cc35f1012feb.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/21/photo/01_thumb_0dc6530f68d549e6a4114343574da1af.jpg",
          thumbnail_key:
            "businesses/21/photo/01_thumb_0dc6530f68d549e6a4114343574da1af.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/21/photo/02_card_21384f1bb011449184bb2ffc6c97576c.jpg",
          url_key:
            "businesses/21/photo/02_card_21384f1bb011449184bb2ffc6c97576c.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/21/photo/02_thumb_5ba29d7d1e9a4fa889318c58e57ce869.jpg",
          thumbnail_key:
            "businesses/21/photo/02_thumb_5ba29d7d1e9a4fa889318c58e57ce869.jpg",
          type: "photo",
          order_index: 2,
        },
      ],
      products: [
        {
          name: "Tuns",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 21,
          currency_id: 1,
          price: 120,
          price_with_discount: 120,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 91,
          user_id: 34,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T08:11:34.658469Z",
          updated_at: "2025-12-06T08:11:34.658469Z",
        },
        {
          name: "Tuns",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 21,
          currency_id: 1,
          price: 100,
          price_with_discount: 100,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 90,
          user_id: 34,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T08:11:27.626492Z",
          updated_at: "2025-12-06T08:11:27.626492Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 20,
      owner: {
        id: 63,
        fullname: "Men Cave",
        username: "men_cave",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/63/cac95babab11453a8a40de0a91d88c2f.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Strada Comana 50, București 011274, România",
      coordinates: {
        lat: 44.45403899999999,
        lng: 26.0694871,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/20/photo/00_card_7dd6bcc9cac64bdfa853c880c1f956b5.jpg",
          url_key:
            "businesses/20/photo/00_card_7dd6bcc9cac64bdfa853c880c1f956b5.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/20/photo/00_thumb_8a9b3ec779f74e0c814dbe0aee038d75.jpg",
          thumbnail_key:
            "businesses/20/photo/00_thumb_8a9b3ec779f74e0c814dbe0aee038d75.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/20/photo/01_card_d76d312199fd4b8189c24f7e72dfcbd5.jpg",
          url_key:
            "businesses/20/photo/01_card_d76d312199fd4b8189c24f7e72dfcbd5.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/20/photo/01_thumb_4ecfe471aec34a5da17331953b9ab379.jpg",
          thumbnail_key:
            "businesses/20/photo/01_thumb_4ecfe471aec34a5da17331953b9ab379.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/20/photo/02_card_ee9cdf99f13a402ea9857fc1faf17aaf.jpg",
          url_key:
            "businesses/20/photo/02_card_ee9cdf99f13a402ea9857fc1faf17aaf.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/20/photo/02_thumb_6bd25bd989864cc693a6de49459e7cbf.jpg",
          thumbnail_key:
            "businesses/20/photo/02_thumb_6bd25bd989864cc693a6de49459e7cbf.jpg",
          type: "photo",
          order_index: 2,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/20/photo/03_card_6b5f8b9ff73048c28e6468ca616cd5ec.jpg",
          url_key:
            "businesses/20/photo/03_card_6b5f8b9ff73048c28e6468ca616cd5ec.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/20/photo/03_thumb_a00cafc6b6284931bcda1a5c61ce9be1.jpg",
          thumbnail_key:
            "businesses/20/photo/03_thumb_a00cafc6b6284931bcda1a5c61ce9be1.jpg",
          type: "photo",
          order_index: 3,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/20/photo/04_card_6acf29bea07243a9a7ed9ca0868970a8.jpg",
          url_key:
            "businesses/20/photo/04_card_6acf29bea07243a9a7ed9ca0868970a8.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/20/photo/04_thumb_f001f6971dd64102aee7137df5c3d9cf.jpg",
          thumbnail_key:
            "businesses/20/photo/04_thumb_f001f6971dd64102aee7137df5c3d9cf.jpg",
          type: "photo",
          order_index: 4,
        },
      ],
      products: [
        {
          name: "Tuns",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 20,
          currency_id: 1,
          price: 90,
          price_with_discount: 90,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 85,
          user_id: 94,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T07:28:37.891282Z",
          updated_at: "2025-12-06T07:28:37.891282Z",
        },
        {
          name: "Tuns",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 20,
          currency_id: 1,
          price: 150,
          price_with_discount: 150,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 86,
          user_id: 94,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T07:28:48.012694Z",
          updated_at: "2025-12-06T07:28:48.012694Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 38,
      owner: {
        id: 187,
        fullname: "Corner Barbershop",
        username: "corner_barbershop",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/187/0dfd911e44764e9b80097f5d93796e57.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Strada Odei 153, București 041046, România",
      coordinates: {
        lat: 44.37488949999999,
        lng: 26.1125764,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/38/photo/00_card_8e34b75f71b84af89d43acc8b487687a.jpg",
          url_key:
            "businesses/38/photo/00_card_8e34b75f71b84af89d43acc8b487687a.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/38/photo/00_thumb_461a98e53fd642e78c63f5ecfdf2ff1f.jpg",
          thumbnail_key:
            "businesses/38/photo/00_thumb_461a98e53fd642e78c63f5ecfdf2ff1f.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/38/photo/01_card_08fe77f9a3ba46ddb2b8e7d4c8540c23.jpg",
          url_key:
            "businesses/38/photo/01_card_08fe77f9a3ba46ddb2b8e7d4c8540c23.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/38/photo/01_thumb_dc429108c69645149eab4fb0a9f0e51f.jpg",
          thumbnail_key:
            "businesses/38/photo/01_thumb_dc429108c69645149eab4fb0a9f0e51f.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/38/photo/02_card_e3e2beea3b43416baf0e3918e121acc8.jpg",
          url_key:
            "businesses/38/photo/02_card_e3e2beea3b43416baf0e3918e121acc8.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/38/photo/02_thumb_fdc87f7a654b4f55a5da12b8f3fe19f6.jpg",
          thumbnail_key:
            "businesses/38/photo/02_thumb_fdc87f7a654b4f55a5da12b8f3fe19f6.jpg",
          type: "photo",
          order_index: 2,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/38/photo/03_card_f20d03a7cf7242fc9cba8e357a77324a.jpg",
          url_key:
            "businesses/38/photo/03_card_f20d03a7cf7242fc9cba8e357a77324a.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/38/photo/03_thumb_17a6eb42109a4e52a0a22079f7a6aea4.jpg",
          thumbnail_key:
            "businesses/38/photo/03_thumb_17a6eb42109a4e52a0a22079f7a6aea4.jpg",
          type: "photo",
          order_index: 3,
        },
      ],
      products: [
        {
          name: "Tuns Special",
          description: "Some description",
          duration: 30,
          service_id: 95,
          business_id: 38,
          currency_id: 1,
          price: 120,
          price_with_discount: 120,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 64,
          user_id: 52,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-05T20:46:04.121447Z",
          updated_at: "2025-12-05T20:46:04.121447Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 42,
      owner: {
        id: 221,
        fullname: "The Barber Cuza",
        username: "the_barber_cuza",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/221/bf74d4687b8d4030a6ca45815f438589.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address:
        "Bulevardul Alexandru Ioan Cuza Nr 105, București 011054, România",
      coordinates: {
        lat: 44.451888,
        lng: 26.0723637,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/42/photo/00_card_e1e8aa847211472d93f964439e156390.jpg",
          url_key:
            "businesses/42/photo/00_card_e1e8aa847211472d93f964439e156390.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/42/photo/00_thumb_9e524f98fdff453d89ec13c4539b93d0.jpg",
          thumbnail_key:
            "businesses/42/photo/00_thumb_9e524f98fdff453d89ec13c4539b93d0.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/42/photo/01_card_c7e559a6fdb84ade9350d1b65b57990a.jpg",
          url_key:
            "businesses/42/photo/01_card_c7e559a6fdb84ade9350d1b65b57990a.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/42/photo/01_thumb_c5195a57efe44a31a4d4ac32e95599e2.jpg",
          thumbnail_key:
            "businesses/42/photo/01_thumb_c5195a57efe44a31a4d4ac32e95599e2.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/42/photo/02_card_127b1428b3da4e90b8a31ed866b73207.jpg",
          url_key:
            "businesses/42/photo/02_card_127b1428b3da4e90b8a31ed866b73207.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/42/photo/02_thumb_441250ffea474e9996441c0b96a3ec15.jpg",
          thumbnail_key:
            "businesses/42/photo/02_thumb_441250ffea474e9996441c0b96a3ec15.jpg",
          type: "photo",
          order_index: 2,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/42/photo/03_card_b3bc842018984af6a84781e174ba5d0c.jpg",
          url_key:
            "businesses/42/photo/03_card_b3bc842018984af6a84781e174ba5d0c.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/42/photo/03_thumb_84680783d17f441b8cdf3dcc6c576baa.jpg",
          thumbnail_key:
            "businesses/42/photo/03_thumb_84680783d17f441b8cdf3dcc6c576baa.jpg",
          type: "photo",
          order_index: 3,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/42/photo/04_card_8e2bb240fda14c6bbe44a44899a692e0.jpg",
          url_key:
            "businesses/42/photo/04_card_8e2bb240fda14c6bbe44a44899a692e0.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/42/photo/04_thumb_e137d1c2c623425a8d9a6a5533b6c7b0.jpg",
          thumbnail_key:
            "businesses/42/photo/04_thumb_e137d1c2c623425a8d9a6a5533b6c7b0.jpg",
          type: "photo",
          order_index: 4,
        },
      ],
      products: [
        {
          name: "Tuns",
          description: "some description",
          duration: 30,
          service_id: 95,
          business_id: 42,
          currency_id: 1,
          price: 120,
          price_with_discount: 120,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 96,
          user_id: 184,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T15:43:52.111605Z",
          updated_at: "2025-12-06T15:43:52.111605Z",
        },
        {
          name: "Tuns",
          description: "some description",
          duration: 30,
          service_id: 95,
          business_id: 42,
          currency_id: 1,
          price: 100,
          price_with_discount: 100,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 95,
          user_id: 184,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T15:43:43.301735Z",
          updated_at: "2025-12-06T15:43:43.301735Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 45,
      owner: {
        id: 225,
        fullname: "Hair Garage Barber Shop",
        username: "hair_garage",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/225/8ab75e39a38342d8ad8f2296f9b0e2c7.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Strada Jiului 2-4, București 013211, România",
      coordinates: {
        lat: 44.4836019,
        lng: 26.0426398,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/45/photo/00_card_c72ad7734c2d41b3a0dd4ac6d19537fe.jpg",
          url_key:
            "businesses/45/photo/00_card_c72ad7734c2d41b3a0dd4ac6d19537fe.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/45/photo/00_thumb_9523502208614003b6b11016cbe50100.jpg",
          thumbnail_key:
            "businesses/45/photo/00_thumb_9523502208614003b6b11016cbe50100.jpg",
          type: "photo",
          order_index: 0,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/45/photo/01_card_600cf5e1f3594fee903cd72daf13977b.jpg",
          url_key:
            "businesses/45/photo/01_card_600cf5e1f3594fee903cd72daf13977b.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/45/photo/01_thumb_c7d2d89f081247a9a90bb565727be7cb.jpg",
          thumbnail_key:
            "businesses/45/photo/01_thumb_c7d2d89f081247a9a90bb565727be7cb.jpg",
          type: "photo",
          order_index: 1,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/45/photo/02_card_35e20fcfd8bb48b1bbfc7748d6c7dea3.jpg",
          url_key:
            "businesses/45/photo/02_card_35e20fcfd8bb48b1bbfc7748d6c7dea3.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/45/photo/02_thumb_7bf7237932734161b588fefa3b822810.jpg",
          thumbnail_key:
            "businesses/45/photo/02_thumb_7bf7237932734161b588fefa3b822810.jpg",
          type: "photo",
          order_index: 2,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/45/photo/03_card_0813505d4aec42e8b7cd1a577585efec.jpg",
          url_key:
            "businesses/45/photo/03_card_0813505d4aec42e8b7cd1a577585efec.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/45/photo/03_thumb_fe1f9d9ac1ed4481bec948fab4376521.jpg",
          thumbnail_key:
            "businesses/45/photo/03_thumb_fe1f9d9ac1ed4481bec948fab4376521.jpg",
          type: "photo",
          order_index: 3,
        },
        {
          url: "https://media.scrollbooker.ro/businesses/45/photo/04_card_b5d5ca0ad3494d23acf3a2ce48682eee.jpg",
          url_key:
            "businesses/45/photo/04_card_b5d5ca0ad3494d23acf3a2ce48682eee.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/45/photo/04_thumb_49ab2b2b5a4e46ec9ab3f6d9621e3833.jpg",
          thumbnail_key:
            "businesses/45/photo/04_thumb_49ab2b2b5a4e46ec9ab3f6d9621e3833.jpg",
          type: "photo",
          order_index: 4,
        },
      ],
      products: [
        {
          name: "Tuns\t",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 45,
          currency_id: 1,
          price: 100,
          price_with_discount: 100,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 98,
          user_id: 65,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 2,
                  name: "Femei",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T18:25:34.370450Z",
          updated_at: "2025-12-06T18:25:34.370450Z",
        },
        {
          name: "Tuns\t",
          description: null,
          duration: 30,
          service_id: 95,
          business_id: 45,
          currency_id: 1,
          price: 75,
          price_with_discount: 75,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 97,
          user_id: 65,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-06T18:25:27.030559Z",
          updated_at: "2025-12-06T18:25:27.030559Z",
        },
      ],
      has_video: false,
      distance: null,
    },
    {
      id: 26,
      owner: {
        id: 69,
        fullname: "Family Barber",
        username: "family_barber",
        avatar:
          "https://media.scrollbooker.ro/avatars/users/69/ce6e4ef67ce64691a2a2c95bc64e67d7.jpg",
        profession: "Frizerie",
        ratings_average: 5.0,
        ratings_count: 0,
      },
      business_type: "Frizerie",
      business_short_domain: "Beauty",
      address: "Strada Subcetate 14, București, România",
      coordinates: {
        lat: 44.4832367,
        lng: 26.0310705,
      },
      media_files: [
        {
          url: "https://media.scrollbooker.ro/businesses/26/photo/00_card_a0cb48ecf8ec44eeb69cf314325cecb9.jpg",
          url_key:
            "businesses/26/photo/00_card_a0cb48ecf8ec44eeb69cf314325cecb9.jpg",
          thumbnail_url:
            "https://media.scrollbooker.ro/businesses/26/photo/00_thumb_2a4ddae59d5e4eec94554a6b7aa66f3a.jpg",
          thumbnail_key:
            "businesses/26/photo/00_thumb_2a4ddae59d5e4eec94554a6b7aa66f3a.jpg",
          type: "photo",
          order_index: 0,
        },
      ],
      products: [
        {
          name: "Tuns normal",
          description: "Some description",
          duration: 30,
          service_id: 95,
          business_id: 26,
          currency_id: 1,
          price: 75,
          price_with_discount: 75,
          discount: 0,
          can_be_booked: true,
          type: "single",
          sessions_count: null,
          validity_days: null,
          id: 69,
          user_id: 79,
          filters: [
            {
              id: 1,
              name: "Gen",
              sub_filters: [
                {
                  id: 1,
                  name: "Bărbați",
                },
              ],
              type: "options",
              unit: null,
              minim: null,
              maxim: null,
              display_as_tab: true,
            },
          ],
          created_at: "2025-12-05T21:00:38.604800Z",
          updated_at: "2025-12-05T21:00:38.604800Z",
        },
      ],
      has_video: false,
      distance: null,
    },
  ],
};
