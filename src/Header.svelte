<script>
</script>

<header>
  <div class="header-left" />
  <div class="header-center">
    <h1>نخ نامرئی</h1>
  </div>
  <div class="header-right">
  </div>
</header>

<style>
  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    z-index: 20;
  }

  .header-center {
    text-align: center;
  }

  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
  }

  h1 {
    font-size: 1.2rem;
    font-family: var(--font-display);
    color: var(--font-color);
    margin: 0;
    font-weight: 600;
  }
</style>
