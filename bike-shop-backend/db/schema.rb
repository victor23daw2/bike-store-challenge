# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_03_22_195410) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cart_items", force: :cascade do |t|
    t.bigint "cart_id", null: false
    t.bigint "product_id", null: false
    t.jsonb "customization"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cart_id"], name: "index_cart_items_on_cart_id"
    t.index ["product_id"], name: "index_cart_items_on_product_id"
  end

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invalid_combinations", force: :cascade do |t|
    t.bigint "option_1_id", null: false
    t.bigint "option_2_id", null: false
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_1_id"], name: "index_invalid_combinations_on_option_1_id"
    t.index ["option_2_id"], name: "index_invalid_combinations_on_option_2_id"
  end

  create_table "option_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "options", force: :cascade do |t|
    t.string "name"
    t.integer "stock"
    t.decimal "extra_price", precision: 8, scale: 2
    t.bigint "option_category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_category_id"], name: "index_options_on_option_category_id"
  end

  create_table "product_options", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.bigint "option_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_id"], name: "index_product_options_on_option_id"
    t.index ["product_id"], name: "index_product_options_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.decimal "price", precision: 8, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "cart_items", "carts"
  add_foreign_key "cart_items", "products"
  add_foreign_key "invalid_combinations", "options", column: "option_1_id"
  add_foreign_key "invalid_combinations", "options", column: "option_2_id"
  add_foreign_key "options", "option_categories"
  add_foreign_key "product_options", "options"
  add_foreign_key "product_options", "products"
end
