class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :phone
      t.string :mac
      t.timestamp :last_seen

      t.timestamps
    end
  end
end
