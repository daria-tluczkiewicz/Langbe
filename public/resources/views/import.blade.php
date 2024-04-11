<form action="/importer" enctype="multipart/form-data" method="post">
    @csrf
        <label for="import">Pudło do myślenia</label>
        <textarea name="import" id="import" cols="30" rows="10"></textarea>

    <input type="submit" style="font-size: 100px;" class="add-button" value="Weź to przemyśl">
</form>
<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 50px;
    }

    form > * {
        width: 900px;
    }

</style>
