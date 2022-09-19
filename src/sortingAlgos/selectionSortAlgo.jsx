<form>

    <ul class="select">
        <li>
            <input class="select_close" type="radio" name="awesomeness" id="awesomeness-close" value="" />
            <span class="select_label select_label-placeholder">Awesomeness Level</span>
        </li>

        <li class="select_items">
            <input class="select_expand" type="radio" name="awesomeness" id="awesomeness-opener" />
            <label class="select_closeLabel" for="awesomeness-close"></label>

            <ul class="select_options">
                <li class="select_option">
                    <input class="select_input" type="radio" name="awesomeness" id="awesomeness-ridiculous" />
                    <label class="select_label" for="awesomeness-ridiculous">ridiculous</label>
                </li>

                <li class="select_option">
                    <input class="select_input" type="radio" name="awesomeness" id="awesomeness-reasonable" />
                    <label class="select_label" for="awesomeness-reasonable">reasonable</label>
                </li>

                <li class="select_option">
                    <input class="select_input" type="radio" name="awesomeness" id="awesomeness-lacking" />
                    <label class="select_label" for="awesomeness-lacking">lacking</label>
                </li>

                <li class="select_option">
                    <input class="select_input" type="radio" name="awesomeness" id="awesomeness-awesomeless" />
                    <label class="select_label" for="awesomeness-awesomeless">awesomeless</label>
                </li>
            </ul>

            <label class="select_expandLabel" for="awesomeness-opener"></label>
        </li>
    </ul>

</form>