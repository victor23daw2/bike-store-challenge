require "test_helper"

class Api::V1::ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_products_index_url
    assert_response :success
  end
end
