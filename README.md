# My Blog

A modern, responsive blog application built with **React**, **Tailwind CSS**, and **Material UI**.  
Users can create, edit, view, and delete posts, filter by category, and enjoy a seamless dark mode experience.

---

## ✨ Features

- **Create, Edit, and Delete Posts:**  
  Add new blog posts, update existing ones, or remove them as needed.

- **View Post Details:**  
  Click on any post to see its full content and metadata.

- **Category Filtering:**  
  Filter posts by category using a dropdown menu.

- **Persistent Storage:**  
  All posts are saved in the browser’s `localStorage` for persistence across sessions.

- **Responsive Design:**  
  Fully responsive layout for mobile, tablet, and desktop.

- **Dark Mode:**  
  Toggle between light and dark themes using Tailwind CSS’s dark mode.

- **Material UI Integration:**  
  Uses Material UI icons and dialogs for a polished user experience.

- **Snackbar Notifications:**  
  Global notifications for actions like creating, editing, or deleting posts.

---

## 🛠️ Technologies Used

- **React** – Frontend library for building user interfaces
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first CSS framework for styling and dark mode
- **Material UI** – UI components and icons
- **localStorage** – Browser storage for persisting posts
- **Vite** (or Create React App) – Fast development server and build tool

---

## 📂 Project Structure

```
myBlog/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── contexts/
│   │   └── SnackbarContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── PostList.jsx
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   ├── PostDetails.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/myBlog.git
   cd myBlog
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

   or for Create React App:

   ```sh
   npm start
   ```

4. **Open in your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## ⚙️ Configuration

- **Tailwind CSS** is configured for dark mode using the `class` strategy.  
  The dark mode toggle adds/removes the `dark` class on the `<html>` element.
- **Material UI** is used for icons and dialogs, styled to match both light and dark themes.
- **SnackbarProvider** context provides global notifications across all pages.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

---

> **Enjoy blogging with My Blog!**
