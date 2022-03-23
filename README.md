# h8-BootcampHub
Hactiv8's Phase 1 Pair Project


## Release 0
1. Setup table sesuai ERD.
2. ABAIKAN Foreign Key `BootcampDetailsId` untuk saat ini.
3. **Bootcamps**
   ```txt
   name (string)
   category (string)
   ```
4. **BootcampDetails**
   ```txt
   fee (integer)
   duration (integer)
   studentLimit (integer)
   ```
5. **Users**
   ```txt
   username (string) UNIQUE NOT NULL
   email (string) UNIQUE NOT NULL
   password (string) LENGTH MIN 8
   role (string) NOT NULL
   BootcampId (integer) FOREIGN KEY
   ```
____________________________________

## Release 1
1. Buat relasi dengan menambahkan FK di add column TAMBAHAN (migration).
2. Add column FK **BootcampDetailsId** di tabel **Bootcamps**

   ON CASCADE ON UPDATE
____________________________________

## Release 2
1. Seeding data berdasarkan file JSON yang tersedia.
____________________________________

## Release 3
**ROUTES**

MODULAR ROUTER !!!

1. `GET /`

   Landing page.
____________________________________

2. `GET /login`

   Login form. Validasi bycrypt.
____________________________________

3. `GET /register`

   Menampilkan form register.
   Input:
   
   `username (text), email (text), password (password)`

   VALIDASI TIAP INPUT !!!

   Tambahkan hooks `beforeCreate` untuk `role` menggunakan instance method. JIKA alamat email adalah `@admin.com`, MAKA `role` = 'Admin'. SELAIN itu, `role` = 'Users'.
____________________________________

4. `POST /login/register`

   req.body dari form register, menyimpan data ke table `Users`. Redirect menuju `/bootcamps` jika berhasil.
____________________________________

5. `GET /bootcamps`

   Menampilkan list bootcamp yang ada.

   NAME  |  CATEGORY  |  DETAIL(button)  |  DELETE(button)

   Button mengarah ke `/bootcamps/:BootcampId/detail`

   Ada juga tombol `ADD` yang hanya akan muncul jika role = 'Admin'.
____________________________________

6. `GET /bootcamps/add`

   Menambah form untuk menambah bootcamp. KHUSUS ADMIN.

   Input:
   `name (text), category(select option [Tech, Finance, Academic, Cooking])`

   VALIDASI !!!
____________________________________

7. `POST /bootcamps/add`

   Menambah bootcamp ke dalam list. Jika berhasil, redirect ke `/bootcamps`
____________________________________

8. `GET /bootcamps/:BootcampId/delete`

   Menghapus bootcamp dari list.
____________________________________

9. `GET /bootcamps/:BootcampId/detail`

   Menampilkan detail bootcamp sesuai ID.

   BOOTCAMP NAME  |  FEE(accounting.js)  |  DURATION(getter formatDuration)  |  EDIT(button)

   formatDuration => `duration = 90` => `duration = 3 month(s) 0 day(s)`

   EDIT button mengarah ke `/bootcamps/:BootcampId/edit`
____________________________________

10. `GET /bootcamps/:BootcampId/edit`

    `POST /bootcamps/:BootcampId/edit`

    Redirect ke `/bootcamps/:BootcampId/detail`
____________________________________

## Release 4
1. Tambah fitur SEARCH untuk list Bootcamp
____________________________________

## Release 5
1. HELPER